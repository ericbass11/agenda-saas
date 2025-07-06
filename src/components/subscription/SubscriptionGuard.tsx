import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';
import { PaymentWall } from './PaymentWall';

interface SubscriptionGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const SubscriptionGuard: React.FC<SubscriptionGuardProps> = ({ 
  children, 
  fallback
}) => {
  const { subscribed, loading } = useSubscription();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!subscribed) {
    return fallback || <PaymentWall />;
  }

  return <>{children}</>;
};