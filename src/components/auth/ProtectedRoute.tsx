import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { Navigate } from 'react-router-dom';
import { PaymentWall } from '@/components/subscription/PaymentWall';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresSubscription?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresSubscription = true 
}) => {
  console.log('ProtectedRoute rendering');
  
  const { user, loading: authLoading } = useAuth();
  const { subscribed, loading: subscriptionLoading } = useSubscription();

  console.log('ProtectedRoute state:', { user: !!user, authLoading, subscribed, subscriptionLoading });

  if (authLoading || subscriptionLoading) {
    console.log('ProtectedRoute: showing loading spinner');
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute: no user, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Se requer assinatura e o usuário não tem assinatura ativa
  if (requiresSubscription && !subscribed) {
    console.log('ProtectedRoute: subscription required but not subscribed, showing PaymentWall');
    return <PaymentWall />;
  }

  console.log('ProtectedRoute: rendering children');
  return <>{children}</>;
};