import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private apiUrl = 'http://localhost:3000/Proyecto/backend/api/UserHandler.php';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = `Error: ${error.status} - ${error.statusText || 'Unknown error'}`;
    if (error.error instanceof ErrorEvent) {
      message = `Client-side error: ${error.error.message}`;
    } else if (error.error) {
      message = `Server-side error: ${error.error.message || error.message}`;
    } else {
      message = 'Unknown server error occurred';
    }
    console.error('API Error:', message);
    return throwError(() => new Error(message));
  }

  postLoginData(loginData: { email: string; password: string }): Observable<any> {
    const params = new HttpParams().set('action', 'loginUser');
    return this.http.post<any>(this.apiUrl, loginData, { params, responseType: 'json' as 'json' })
      .pipe(catchError(this.handleError));
  }

  postRegistroData(registroData: any): Observable<any> {
    const params = new HttpParams().set('action', 'registerNewUser');
    return this.http.post<any>(this.apiUrl, registroData, { params, responseType: 'json' as 'json' })
      .pipe(catchError(this.handleError));
  }

  logoutUser(sessionId: string): Observable<any> {
    const params = new HttpParams().set('action', 'logoutUser');
    return this.http.post<any>(this.apiUrl, { session_id: sessionId }, { params, responseType: 'json' as 'json' })
      .pipe(catchError(this.handleError));
  }
}
