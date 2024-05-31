import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProductService } from '../services/productos.service';
import { AddProductFormComponent } from './AddProductFormComponent';
import { ConfirmDialogComponent } from './ConfirmDialogComponent';

@Component({
  selector: 'app-productos-handler',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule,
    AddProductFormComponent,
    ConfirmDialogComponent
  ],
  templateUrl: './ProductosHandler.component.html',
  styleUrls: ['./productoshandler.component.css']
})
export class ProductosHandlerComponent {
  productos: any[] = [];
  filteredProductos: any[] = [];
  displayedProductos: any[] = [];
  showAddForm = false;
  newProduct: any = {};
  isUpdating = false;
  currentPage = 1;
  itemsPerPage = 10;
  searchTerm: string = '';

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.checkAccess();
    this.loadProductos();
  }

  checkAccess() {
    const session = localStorage.getItem('userSession');
    if (session) {
      const sessionData = JSON.parse(session);
      if (sessionData.perfil !== 2) {
        this.router.navigate(['/']);
      }
    } else {
      this.router.navigate(['/iniciosesion']);
    }
  }

  loadProductos() {
    this.productService.getProducts().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.filteredProductos = productos;
        this.setDisplayedProductos();
      },
      error: (error) => {
        this.snackBar.open('Error al cargar productos: ' + error.message, 'Cerrar', { duration: 3000 });
      }
    });
  }

  filterProductos() {
    this.filteredProductos = this.productos.filter(product => 
      product.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.categoria.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.tipo.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.condicion.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.precio.toString().includes(this.searchTerm)
    );
    this.currentPage = 1;
    this.setDisplayedProductos();
  }

  setDisplayedProductos() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProductos = this.filteredProductos.slice(startIndex, endIndex);
  }

  editProduct(product: any) {
    this.newProduct = { ...product };
    this.showAddForm = true;
    this.isUpdating = true;
    this.scrollToTop();
  }

  deleteProduct(productId: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '550px',
      data: { title: 'Confirmar', message: '¿Estás seguro de que deseas eliminar este producto?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.deleteProduct(productId).subscribe({
          next: () => {
            this.snackBar.open('Producto eliminado con éxito', 'Cerrar', { duration: 3000 });
            this.loadProductos();
          },
          error: (error) => {
            this.snackBar.open('Error al eliminar producto: ' + error.message, 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    if (!this.showAddForm) {
      this.isUpdating = false;
      this.newProduct = {};
      this.scrollToTop();
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onSubmit() {
    if (this.isUpdating) {
      this.productService.updateProduct(this.newProduct).subscribe({
        next: () => {
          this.snackBar.open('Producto actualizado con éxito', 'Cerrar', { duration: 3000 });
          this.loadProductos();
          this.toggleAddForm();
        },
        error: (error) => {
          this.snackBar.open('Error al actualizar producto: ' + error.message, 'Cerrar', { duration: 3000 });
        }
      });
    } else {
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.snackBar.open('Producto agregado con éxito', 'Cerrar', { duration: 3000 });
          this.loadProductos();
          this.toggleAddForm();
        },
        error: (error) => {
          this.snackBar.open('Error al agregar producto: ' + error.message, 'Cerrar', { duration: 3000 });
        }
      });
    }
  }

  changePage(page: number) {
    this.currentPage = page;
    this.setDisplayedProductos();
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredProductos.length / this.itemsPerPage);
  }
}
