import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 400px; margin: 40px auto; padding: 20px; font-family: Arial; border: 1px solid #ccc; border-radius: 8px;">
      <h2>Iniciar Sesión</h2>
      <form (ngSubmit)="onLogin()">
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Usuario:</label>
          <input type="text" [(ngModel)]="loginData.login" name="login" required style="width: 100%; padding: 8px;" />
        </div>
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px;">Contraseña:</label>
          <input type="password" [(ngModel)]="loginData.password" name="password" required style="width: 100%; padding: 8px;" />
        </div>
        <button type="submit" style="width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Ingresar</button>
      </form>
      <p *ngIf="errorMessage" style="color: red; margin-top: 15px;">{{ errorMessage }}</p>
    </div>
  `
})
export class LoginComponent {
  loginData = { login: '', password: '' };
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) {}

  onLogin() {
    this.apiService.login(this.loginData).subscribe({
      next: (response: any) => {
        console.log('Login exitoso:', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error en el login:', err);
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}