import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../services/database.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './iniciosesion.component.html',
  styleUrls: ['./iniciosesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  loginData = { email: '', password: '' };
  registroData = {
    nombre: '',
    apellido: '',
    email: '',
    genero: '',
    password: '',
    confirmPassword: '',
    numero: '',
    perfil: 1  // Añadir campo de perfil para el registro
  };

  showingLogin = true;
  isLoggedIn = false;
  userProfile = '';

  constructor(private databaseService: DatabaseService, private router: Router) {}

  ngOnInit() {
    // Verificar si hay una sesión activa
    const session = localStorage.getItem('userSession');
    if (session) {
      const sessionData = JSON.parse(session);
      this.isLoggedIn = true;
      this.userProfile = sessionData.perfil;
    }
  }

  private showAlert(title: string, text: string, icon: any, callback?: () => void) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    }).then(() => {
      if (callback) {
        callback();
      }
    });
  }

  login() {
    if (!this.loginData.email || !this.loginData.password) {
      this.showAlert('Error', 'Por favor, complete todos los campos de inicio de sesión.', 'error');
      return;
    }

    this.databaseService.postLoginData(this.loginData).subscribe({
      next: (response) => {
        if (response.success) {
          this.isLoggedIn = true;
          this.userProfile = response.perfil;
          localStorage.setItem('userSession', JSON.stringify({ sessionId: response.session_id, perfil: response.perfil, nombres: response.nombres, foto: response.foto }));
          this.showAlert('¡Bienvenido!', `Hola ${response.nombres}! Bienvenido de nuevo.`, 'success', () => {
            this.router.navigate(['/inicio']).then(() => {
              window.location.reload(); // Forzar la recarga de la página para aplicar los cambios
            });
          });
        } else {
          this.showAlert('Error', 'Inicio de sesión fallido: ' + (response.error || 'Los detalles no están disponibles.'), 'error');
        }
      },
      error: (error) => this.handleHttpError(error)
    });
  }

  registro() {
    const camposRequeridos = [this.registroData.nombre, this.registroData.apellido, this.registroData.email, this.registroData.genero, this.registroData.password, this.registroData.confirmPassword, this.registroData.numero];
    if (camposRequeridos.some(campo => !campo)) {
      this.showAlert('Error', 'Por favor, complete todos los campos.', 'error');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(this.registroData.email)) {
      this.showAlert('Error', 'Por favor, ingrese un correo electrónico válido.', 'error');
      return;
    }

    if (this.registroData.password.length < 8) {
      this.showAlert('Error', 'La contraseña debe tener al menos 8 caracteres.', 'error');
      return;
    }

    if (this.registroData.password !== this.registroData.confirmPassword) {
      this.showAlert('Error', 'La confirmación de contraseña no coincide.', 'error');
      return;
    }

    if (!/^\d{10}$/.test(this.registroData.numero)) {
      this.showAlert('Error', 'Por favor, ingrese un número de teléfono válido de 10 dígitos.', 'error');
      return;
    }

    this.databaseService.postRegistroData(this.registroData).subscribe({
      next: (response) => {
        if (response.success) {
          this.showAlert('Éxito', 'Registro exitoso: ' + response.message, 'success');
          localStorage.setItem('userSession', JSON.stringify({ sessionId: response.session_id, perfil: response.perfil, nombres: response.nombres, foto: response.foto }));
          this.showingLogin = true; // Cambiar al formulario de inicio de sesión
        } else {
          this.showAlert('Error', 'Registro fallido: ' + (response.error || 'Error durante el registro: Los detalles no están disponibles.'), 'error');
        }
      },
      error: (error) => this.handleHttpError(error)
    });
  }

  logout() {
    localStorage.removeItem('userSession');
    this.isLoggedIn = false;
    this.userProfile = '';
    this.router.navigate(['/iniciosesion']);
  }

  getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Error de red: ${error.error.message || 'Verifica tu conexión a Internet.'}`;
    } else {
      if (error.status === 0) {
        return 'No se pudo conectar con el servidor. Por favor verifica tu conexión a Internet.';
      } else if (error.error && typeof error.error === 'object') {
        if (error.error.errors) {
          return `Error durante la solicitud: ${Object.values(error.error.errors).join(', ')}`;
        }
        if (error.error.message) {
          return `Error: ${error.error.message}`;
        }
      }
      return `Error ${error.status} al procesar la solicitud: ${error.statusText || 'Detalles no disponibles'}`;
    }
  }

  handleHttpError(error: HttpErrorResponse) {
    this.showAlert('Error', this.getErrorMessage(error), 'error');
  }

  toggleForms() {
    this.showingLogin = !this.showingLogin;
  }
}
