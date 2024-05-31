import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface ApiResponse {
  success: boolean;
  message?: string;
  products?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost/Proyecto/backend/api/ProductHandler.php';

  constructor(private http: HttpClient) { }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred: ';
    if (error.error instanceof ErrorEvent) {
      errorMessage += `Client-side error: ${error.error.message}`;
    } else {
      errorMessage += `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getProducts(): Observable<any[]> {
    return this.http.get<ApiResponse>(this.apiUrl)
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error(response.message || 'Failed to load products');
          }
          return response.products || [];
        }),
        catchError(this.handleError)
      );
  }

  addProduct(productData: any): Observable<string> {
    const body = { ...productData, action: 'add' };
    return this.http.post<ApiResponse>(this.apiUrl, body)
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error(response.message || 'Failed to add product');
          }
          return response.message || 'Product added successfully';
        }),
        catchError(this.handleError)
      );
  }

  updateProduct(productData: any): Observable<string> {
    const body = { ...productData, action: 'update' };
    return this.http.post<ApiResponse>(this.apiUrl, body)
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error(response.message || 'Failed to update product');
          }
          return response.message || 'Product updated successfully';
        }),
        catchError(this.handleError)
      );
  }

  deleteProduct(productId: number): Observable<string> {
    const body = { id: productId, action: 'delete' };
    return this.http.post<ApiResponse>(this.apiUrl, body)
      .pipe(
        map(response => {
          if (!response.success) {
            throw new Error(response.message || 'Failed to delete product');
          }
          return response.message || 'Product deleted successfully';
        }),
        catchError(this.handleError)
      );
  }
}
