import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8010/api';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token') || '';
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  private normalizarTabla(tabla: string): string {
    if (tabla === 'grupoPermisos') {
      return 'grupo-permisos';
    }
    return tabla;
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, credentials);
  }

  getUsuarios(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuarios`, this.getHeaders());
  }

  getClientes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/clientes`, this.getHeaders());
  }

  getGrupos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/grupos`, this.getHeaders());
  }

  getPermisos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/permisos`, this.getHeaders());
  }

  getGrupoPermisos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/grupo-permisos`, this.getHeaders());
  }

  getRecibos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/recibos`, this.getHeaders());
  }

  eliminarRegistro(tabla: string, id: number | string): Observable<any> {
    const endpoint = this.normalizarTabla(tabla);
    return this.http.delete(`${this.baseUrl}/${endpoint}/${id}`, this.getHeaders());
  }

  crearRegistro(tabla: string, datos: any): Observable<any> {
    const endpoint = this.normalizarTabla(tabla);
    return this.http.post(`${this.baseUrl}/${endpoint}`, datos, this.getHeaders());
  }

  actualizarRegistro(tabla: string, id: number | string, datos: any): Observable<any> {
    const endpoint = this.normalizarTabla(tabla);
    return this.http.put(`${this.baseUrl}/${endpoint}/${id}`, datos, this.getHeaders());
  }
}