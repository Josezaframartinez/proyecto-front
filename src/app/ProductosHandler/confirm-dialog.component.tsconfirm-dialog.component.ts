import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// The data structure that will be passed to this dialog
export interface DialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>{{ data.title }}</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button class="cancel-button" (click)="onDismiss()">Cancelar</button>
      <button mat-button class="delete-button" (click)="onConfirm()">Eliminar</button>
    </div>
  `,
  styles: [`
    .mat-dialog-container {
        width: 90vw;
        max-width: 400px;
        padding: 30px;
        background-color: #ffffff;
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Roboto', sans-serif;
        color: #333;
    }

    h1 {
        font-size: 22px;
        text-align: center;
        margin-bottom: 20px;
        font-weight: 500;
    }

    p {
        text-align: center;
        font-size: 16px;
        margin-bottom: 30px;
        color: #666;
        line-height: 1.5;
    }

    .mat-dialog-actions {
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 10px;
    }

    button {
        flex-grow: 1;
        padding: 10px 0;
        font-size: 14px;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s, transform 0.2s;
    }

    button:hover {
        transform: scale(1.05);
    }

    .cancel-button {
        background-color: #f0f0f0;
        color: #333;
    }

    .cancel-button:hover {
        background-color: #e0e0e0;
    }

    .delete-button {
        background-color: #ff5252;
        color: white;
    }

    .delete-button:hover {
        background-color: #ff3030;
    }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);  // True indicates that the user confirmed the action
  }

  onDismiss(): void {
    this.dialogRef.close(false);  // False indicates that the user dismissed the action
  }
}
