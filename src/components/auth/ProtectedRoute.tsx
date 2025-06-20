
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
  const { user, loading: authLoading } = useAuth();
  const { subscribed, loading: subscriptionLoading } = useSubscription();

  if (authLoading || subscriptionLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Se requer assinatura e o usuário não tem assinatura ativa
  if (requiresSubscription && !subscribed) {
    return <PaymentWall />;
  }

  return <>{children}</>;
};
