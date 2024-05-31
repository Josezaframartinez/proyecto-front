// src/app/interfaces/alert.interface.ts

export interface Alert {
    type: 'success' | 'error';  // Usando uniones de tipo para restringir a valores específicos.
    message: string;
  }
  