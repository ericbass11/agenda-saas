// Supabase Health Check Utility
export const checkSupabaseHealth = async (projectUrl: string): Promise<{ isHealthy: boolean; error?: string }> => {
  try {
    const healthUrl = `${projectUrl}/auth/v1/health`;
    const response = await fetch(healthUrl, {
      method: 'GET',
      timeout: 5000,
    } as RequestInit & { timeout: number });
    
    if (response.ok) {
      return { isHealthy: true };
    } else {
      return { 
        isHealthy: false, 
        error: `Supabase health check failed with status: ${response.status}` 
      };
    }
  } catch (error) {
    return { 
      isHealthy: false, 
      error: error instanceof Error ? error.message : 'Unknown network error' 
    };
  }
};

export const getConnectionErrorMessage = (error: any): string => {
  const errorMessage = error?.message || '';
  
  if (errorMessage.includes('Failed to fetch') || errorMessage.includes('ERR_NAME_NOT_RESOLVED')) {
    return 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.';
  }
  
  if (errorMessage.includes('NETWORK_ERROR')) {
    return 'Erro de rede. Verifique sua conexão e tente novamente.';
  }
  
  if (errorMessage.includes('Invalid JWT') || errorMessage.includes('refresh_token_not_found')) {
    return 'Sessão expirada. Faça login novamente.';
  }
  
  return errorMessage || 'Erro inesperado. Tente novamente.';
};