import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { Alert } from '../../interfaces/alert.interface'; // Asegúrate de que la ruta de importación es correcta

@Component({
  selector: 'app-alert',
  template: `
    <div *ngIf="alert" [ngClass]="{'alert-success': alert.type === 'success', 'alert-error': alert.type === 'error'}">
      {{ alert.message }}
      <button (click)="closeAlert()">Cerrar</button>
    </div>
  `,
  styles: [`
    .alert-success { color: green; }
    .alert-error { color: red; }
  `]
})
export class AlertComponent implements OnDestroy {
  alert: Alert | null = null;
  private subscription: Subscription;

  constructor(private alertService: AlertService) {
    this.subscription = this.alertService.alerts.subscribe((alert: Alert | null) => { // Explicitamente definiendo el tipo aquí
      this.alert = alert;
    });
  }

  closeAlert() {
    this.alertService.closeAlert();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
