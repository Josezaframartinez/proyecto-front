import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Alert } from '../interfaces/alert.interface'; // Ajusta la ruta según tu estructura de carpetas

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new BehaviorSubject<Alert | null>(null);
  public alerts = this.alertSubject.asObservable();

  constructor() {}

  showAlert(type: 'success' | 'error', message: string) {
    this.alertSubject.next({ type, message });
  }

  closeAlert() {
    this.alertSubject.next(null);
  }
}
