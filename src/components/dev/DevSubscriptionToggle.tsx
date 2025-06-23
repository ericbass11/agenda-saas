
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, ToggleLeft, ToggleRight } from 'lucide-react';

export const DevSubscriptionToggle = () => {
  const [devMode, setDevMode] = React.useState(() => 
    localStorage.getItem('dev-subscription-override') === 'true'
  );

  const toggleDevMode = () => {
    const newMode = !devMode;
    setDevMode(newMode);
    localStorage.setItem('dev-subscription-override', newMode.toString());
    window.location.reload(); // Reload to apply changes
  };

  // Only show in development environment
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-orange-800 flex items-center gap-2">
          <Settings className="w-4 h-4" />
          Modo Desenvolvedor
          <Badge variant="outline" className="text-xs">DEV</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <span className="text-sm text-orange-700">
            Contornar verificação de assinatura
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleDevMode}
            className="h-auto p-1 text-orange-600 hover:text-orange-700"
          >
            {devMode ? (
              <ToggleRight className="w-6 h-6" />
            ) : (
              <ToggleLeft className="w-6 h-6" />
            )}
          </Button>
        </div>
        {devMode && (
          <p className="text-xs text-orange-600 mt-2">
            ⚠️ Verificação de assinatura desabilitada para desenvolvimento
          </p>
        )}
      </CardContent>
    </Card>
  );
};
