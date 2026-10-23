import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-test-conexion',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding: 20px; font-family: Arial;">
      <h2>Prueba de Conexión Angular con Node.js</h2>
      <button (click)="probarUsuarios()" style="padding: 10px 15px; cursor: pointer;">Cargar Usuarios</button>
      <ul style="margin-top: 15px;">
        <li *ngFor="let user of usuarios">
          Usuario: {{ user.login }} - Rol: {{ user.grupo?.nombre }}
        </li>
      </ul>
    </div>
  `
})
export class TestConexionComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  probarUsuarios() {
    this.apiService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        console.log('Usuarios obtenidos:', data);
      },
      error: (err) => {
        console.error('Error al conectar con el back-end:', err);
      }
    });
  }
}