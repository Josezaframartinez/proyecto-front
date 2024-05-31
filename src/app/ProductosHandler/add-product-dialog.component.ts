// add-product-dialog.component.ts
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../services/productos.service';

@Component({
  selector: 'app-add-product-dialog',
  templateUrl: './add-product-dialog.component.html',
  styleUrls: ['./add-product-dialog.component.css']
})
export class AddProductDialogComponent {
  productForm = new FormGroup({
    nombre: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required),
    precio: new FormControl('', [Validators.required, Validators.min(0)]),
    marca: new FormControl('', Validators.required),
    condicion: new FormControl('', Validators.required),
    ubicacion: new FormControl('', Validators.required),
    imagen: new FormControl('', Validators.required),
    fecha_vencimiento: new FormControl('', Validators.required),
    tipo: new FormControl('', Validators.required)
  });

  constructor(
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    private productService: ProductService
  ) {}

  onSubmit() {
    if (this.productForm.valid) {
      this.productService.addProduct(this.productForm.value).subscribe({
        next: (response) => {
          this.dialogRef.close(true); // Close the dialog on success
        },
        error: (error) => {
          console.error('Failed to add product:', error);
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(); // Close the dialog without submitting
  }
}
