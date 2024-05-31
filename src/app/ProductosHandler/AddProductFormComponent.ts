import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-product-form',
  template: `
    <form (ngSubmit)="submitForm()">
      <!-- Aquí irían todos los campos del formulario, simplificado para el ejemplo -->
      <input type="text" placeholder="Nombre del producto" required>
      <button type="submit">Agregar</button>
      <button type="button" (click)="cancel.emit()">Cancelar</button>
    </form>
  `,
  standalone: true
})
export class AddProductFormComponent {
  @Output() onSubmit = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  submitForm() {
    this.onSubmit.emit();  // Simula la finalización exitosa del formulario
  }
}
