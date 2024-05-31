export class RegisterModel {
    constructor(
      public nombre: string,
      public apellido: string,
      public email: string,
      public genero: string,
      public password: string,
      public confirmPassword: string,
      public numero: string
    ) {}
  }