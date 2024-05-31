// LoginResponse.ts
export interface LoginResponse {
    success: boolean;
    message?: string;
    error?: string;
    user?: {
      email: string;
      perfil: string;
    };
  }
  