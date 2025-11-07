
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { checkSupabaseHealth, getConnectionErrorMessage } from '@/lib/supabase-health';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isSupabaseHealthy: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkHealth: () => Promise<{ isHealthy: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSupabaseHealthy, setIsSupabaseHealthy] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // First check Supabase health
        const healthCheck = await checkSupabaseHealth(import.meta.env.VITE_SUPABASE_URL);
        setIsSupabaseHealthy(healthCheck.isHealthy);
        
        if (!healthCheck.isHealthy) {
          console.warn('Supabase health check failed:', healthCheck.error);
          setLoading(false);
          return;
        }

        // Get initial session
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error getting session:', error);
        }
        setSession(session);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error in initializeAuth:', error);
        setIsSupabaseHealthy(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes only if Supabase is healthy
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const checkHealth = async () => {
    const healthCheck = await checkSupabaseHealth(import.meta.env.VITE_SUPABASE_URL);
    setIsSupabaseHealthy(healthCheck.isHealthy);
    return healthCheck;
  };

  const signUp = async (email: string, password: string) => {
    console.log('Attempting sign up for:', email);
    
    // Check Supabase health before attempting signup
    if (!isSupabaseHealthy) {
      const healthCheck = await checkHealth();
      if (!healthCheck.isHealthy) {
        throw new Error('Serviço temporariamente indisponível. Tente novamente em alguns minutos.');
      }
    }
    
    const redirectUrl = `${window.location.origin}/`;
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      
      if (error) {
        console.error('Sign up error:', error);
        const friendlyMessage = getConnectionErrorMessage(error);
        throw new Error(friendlyMessage);
      }
      console.log('Sign up successful');
    } catch (error: any) {
      if (error.message && !error.message.includes('Failed to fetch')) {
        throw error; // Re-throw our friendly error
      }
      // Handle network errors
      const friendlyMessage = getConnectionErrorMessage(error);
      throw new Error(friendlyMessage);
    }
  };

  const signIn = async (email: string, password: string) => {
    console.log('Attempting sign in for:', email);
    
    // Check Supabase health before attempting signin
    if (!isSupabaseHealthy) {
      const healthCheck = await checkHealth();
      if (!healthCheck.isHealthy) {
        throw new Error('Serviço temporariamente indisponível. Tente novamente em alguns minutos.');
      }
    }
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error('Sign in error:', error);
        const friendlyMessage = getConnectionErrorMessage(error);
        throw new Error(friendlyMessage);
      }
      console.log('Sign in successful');
    } catch (error: any) {
      if (error.message && !error.message.includes('Failed to fetch')) {
        throw error; // Re-throw our friendly error
      }
      // Handle network errors
      const friendlyMessage = getConnectionErrorMessage(error);
      throw new Error(friendlyMessage);
    }
  };

  const signOut = async () => {
    console.log('Attempting sign out');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign out error:', error);
      throw error;
    }
    console.log('Sign out successful');
  };

  const value = {
    user,
    session,
    loading,
    isSupabaseHealthy,
    signUp,
    signIn,
    signOut,
    checkHealth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
