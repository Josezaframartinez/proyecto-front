import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  enviarDatos(data: any) {
    return this.http.post('http://localhost/Proyecto-Front-end-main/backend/api/UserHandler.php', data);
  }
}
