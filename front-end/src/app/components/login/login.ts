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
    <div style="max-width: 420px; margin: 60px auto; padding: 20px; font-family: Arial; border: 1px solid #ccc; border-radius: 10px; background: #f9f9f9;">
      <h2 style="text-align: center; font-size: 2rem; margin-bottom: 25px;">Iniciar Sesión</h2>

      <form (ngSubmit)="onLogin()">
        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: bold;">Usuario:</label>
          <input type="text" [(ngModel)]="loginData.login" name="login" required style="width: 100%; padding: 10px; box-sizing: border-box;" />
        </div>

        <div style="margin-bottom: 15px;">
          <label style="display: block; margin-bottom: 5px; font-weight: bold;">Contraseña:</label>
          <input type="password" [(ngModel)]="loginData.password" name="password" required style="width: 100%; padding: 10px; box-sizing: border-box;" />
        </div>

        <button type="submit" style="width: 100%; padding: 12px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1.1rem;">
          Ingresar
        </button>
      </form>

      <p *ngIf="errorMessage" style="color: red; margin-top: 15px; text-align: center;">{{ errorMessage }}</p>
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