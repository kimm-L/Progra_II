import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="padding: 20px; font-family: Arial;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h2>Dashboard Principal</h2>
        <button
          (click)="logout()"
          style="padding: 8px 16px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;"
        >
          Cerrar Sesión
        </button>
      </div>

      <div style="margin-bottom: 20px; display: flex; flex-wrap: wrap; gap: 10px;">
        <button (click)="cargarTabla('usuarios', apiService.getUsuarios())" style="padding: 10px 15px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">Usuarios</button>
        <button (click)="cargarTabla('clientes', apiService.getClientes())" style="padding: 10px 15px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">Clientes</button>
        <button (click)="cargarTabla('grupos', apiService.getGrupos())" style="padding: 10px 15px; background-color: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer;">Grupos</button>
        <button (click)="cargarTabla('permisos', apiService.getPermisos())" style="padding: 10px 15px; background-color: #ffc107; color: black; border: none; border-radius: 4px; cursor: pointer;">Permisos</button>
        <button (click)="cargarTabla('grupoPermisos', apiService.getGrupoPermisos())" style="padding: 10px 15px; background-color: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">Grupo Permisos</button>
        <button (click)="cargarTabla('recibos', apiService.getRecibos())" style="padding: 10px 15px; background-color: #343a40; color: white; border: none; border-radius: 4px; cursor: pointer;">Recibos</button>
      </div>

      <div *ngIf="vistaActual">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <h3>Vista de: {{ vistaActual | uppercase }}</h3>
          <button (click)="abrirFormularioNuevo()" style="padding: 8px 12px; background-color: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">+ Nuevo Registro</button>
        </div>

        <div *ngIf="modoCrear || modoEditar" style="background: #f8f9fa; padding: 15px; border: 1px solid #ddd; margin-bottom: 20px; border-radius: 5px;">
          <h4>{{ modoEditar ? 'Editar registro en ' + vistaActual : 'Agregar nuevo en ' + vistaActual }}</h4>

          <ng-container *ngIf="vistaActual === 'usuarios'">
            <div style="margin-bottom: 10px;">
              <label style="display: block; font-weight: bold; margin-bottom: 5px;">login:</label>
              <input type="text" [(ngModel)]="registroActual.login" style="width: 100%; padding: 8px; box-sizing: border-box;" />
            </div>

            <div style="margin-bottom: 10px;">
              <label style="display: block; font-weight: bold; margin-bottom: 5px;">password:</label>
              <input type="password" [(ngModel)]="registroActual.password" style="width: 100%; padding: 8px; box-sizing: border-box;" />
            </div>

            <div style="margin-bottom: 10px;">
              <label style="display: block; font-weight: bold; margin-bottom: 5px;">grupoId:</label>
              <select [(ngModel)]="registroActual.grupoId" style="width: 100%; padding: 8px; box-sizing: border-box;">
                <option [ngValue]="1">1</option>
                <option [ngValue]="2">2</option>
              </select>
            </div>
          </ng-container>

          <ng-container *ngIf="vistaActual === 'clientes'">
            <div style="margin-bottom: 10px;">
              <label style="display: block; font-weight: bold; margin-bottom: 5px;">nombre:</label>
              <input type="text" [(ngModel)]="registroActual.nombre" style="width: 100%; padding: 8px; box-sizing: border-box;" />
            </div>

            <div style="margin-bottom: 10px;">
              <label style="display: block; font-weight: bold; margin-bottom: 5px;">direccion:</label>
              <input type="text" [(ngModel)]="registroActual.direccion" style="width: 100%; padding: 8px; box-sizing: border-box;" />
            </div>

            <div style="margin-bottom: 10px;">
              <label style="display: block; font-weight: bold; margin-bottom: 5px;">telefono:</label>
              <input type="text" [(ngModel)]="registroActual.telefono" style="width: 100%; padding: 8px; box-sizing: border-box;" />
            </div>

            <div style="margin-bottom: 10px;">
              <label style="display: block; font-weight: bold; margin-bottom: 5px;">email:</label>
              <input type="email" [(ngModel)]="registroActual.email" style="width: 100%; padding: 8px; box-sizing: border-box;" />
            </div>
          </ng-container>

          <ng-container *ngIf="vistaActual !== 'usuarios' && vistaActual !== 'clientes'">
            <div *ngFor="let col of columnas" style="margin-bottom: 10px;" [hidden]="esIdColumna(col) && !modoEditar">
              <label style="display: block; font-weight: bold; margin-bottom: 5px;">{{ col }}:</label>
              <input type="text" [(ngModel)]="registroActual[col]" [disabled]="modoEditar && esIdColumna(col)" style="width: 100%; padding: 8px; box-sizing: border-box;" />
            </div>
          </ng-container>

          <button (click)="modoEditar ? actualizarRegistro() : guardarNuevo()" style="padding: 8px 15px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
            {{ modoEditar ? 'Actualizar' : 'Guardar' }}
          </button>

          <button (click)="cerrarFormularios()" style="padding: 8px 15px; background-color: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;">Cancelar</button>
        </div>

        <table border="1" style="width: 100%; border-collapse: collapse; margin-top: 10px; text-align: left;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="padding: 8px;" *ngFor="let col of columnas">{{ col }}</th>
              <th style="padding: 8px;">Acciones</th>
            </tr>
          </thead>

          <tbody>
            <tr *ngFor="let row of datosActuales">
              <td style="padding: 8px;" *ngFor="let col of columnas">{{ row[col] }}</td>
              <td style="padding: 8px;">
                <button (click)="abrirFormularioEditar(row)" style="margin-right: 5px; background-color: #ffc107; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer;">Editar</button>
                <button (click)="eliminar(row)" style="background-color: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 3px; cursor: pointer;">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p *ngIf="mensajeError" style="color: red; margin-top: 15px;">{{ mensajeError }}</p>
    </div>
  `
})
export class DashboardComponent implements OnInit {
  datosActuales: any[] = [];
  columnas: string[] = [];
  vistaActual: string = '';
  mensajeError: string = '';

  modoCrear: boolean = false;
  modoEditar: boolean = false;
  registroActual: any = {};
  idRegistroSeleccionado: any = null;

  private camposPorVista: Record<string, string[]> = {
    usuarios: ['id', 'login', 'grupoId'],
    clientes: ['id', 'nombre', 'direccion', 'telefono', 'email'],
    grupos: ['id', 'nombre'],
    permisos: ['id', 'nombre'],
    grupoPermisos: ['id', 'grupoId', 'permisoId'],
    recibos: ['id', 'clienteId', 'fecha', 'descripcion', 'total']
  };

  constructor(public apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.cargarTabla('usuarios', this.apiService.getUsuarios());
  }

  cargarTabla(nombre: string, observable: any) {
    this.mensajeError = '';
    this.cerrarFormularios();

    observable.subscribe({
      next: (data: any) => {
        this.datosActuales = data || [];
        this.vistaActual = nombre;

        if (this.datosActuales.length > 0) {
          const columnasBase = Object.keys(this.datosActuales[0]);

          if (nombre === 'clientes') {
            this.columnas = ['id', 'nombre', 'direccion', 'telefono', 'email'];
          } else if (nombre === 'usuarios') {
            this.columnas = ['id', 'login', 'grupoId'];
          } else {
            this.columnas = columnasBase.filter(col =>
              !['createdAt', 'updatedAt', 'grupo', 'usuario', 'cliente', 'permiso'].includes(col)
            );
          }
        } else {
          this.columnas = this.camposPorVista[nombre] || [];
        }
      },
      error: (err: any) => {
        console.error(`Error al cargar ${nombre}:`, err);
        this.mensajeError = `No se pudieron cargar los datos de ${nombre}.`;
      }
    });
  }

  esIdColumna(col: string): boolean {
    return col.toLowerCase().startsWith('id') || col.toLowerCase().includes('id_');
  }

  abrirFormularioNuevo() {
    this.modoCrear = true;
    this.modoEditar = false;

    if (this.vistaActual === 'usuarios') {
      this.registroActual = {
        login: '',
        password: '',
        grupoId: 1
      };
    } else if (this.vistaActual === 'clientes') {
      this.registroActual = {
        nombre: '',
        direccion: '',
        telefono: '',
        email: ''
      };
    } else if (this.vistaActual === 'grupos') {
      this.registroActual = { nombre: '' };
    } else if (this.vistaActual === 'permisos') {
      this.registroActual = { nombre: '' };
    } else if (this.vistaActual === 'grupoPermisos') {
      this.registroActual = {
        grupoId: 1,
        permisoId: 1
      };
    } else if (this.vistaActual === 'recibos') {
      this.registroActual = {
        clienteId: 1,
        fecha: '',
        descripcion: '',
        total: ''
      };
    } else {
      this.registroActual = {};
    }
  }

  abrirFormularioEditar(row: any) {
    this.modoEditar = true;
    this.modoCrear = false;

    this.idRegistroSeleccionado =
      row.id_usuario ||
      row.id_cliente ||
      row.id_grupo ||
      row.id_permiso ||
      row.id_recibo ||
      row.id;

    const limpio = { ...row };

    delete limpio.createdAt;
    delete limpio.updatedAt;
    delete limpio.grupo;
    delete limpio.usuario;
    delete limpio.cliente;
    delete limpio.permiso;

    this.registroActual = limpio;
  }

  cerrarFormularios() {
    this.modoCrear = false;
    this.modoEditar = false;
    this.registroActual = {};
    this.idRegistroSeleccionado = null;
  }

  guardarNuevo() {
    const payload = { ...this.registroActual };

    if (this.vistaActual === 'usuarios') {
      if (!payload.login || !payload.login.trim()) {
        this.mensajeError = 'El login es obligatorio.';
        return;
      }
      if (!payload.password || !payload.password.trim()) {
        this.mensajeError = 'La contraseña es obligatoria.';
        return;
      }
      if (!payload.grupoId) {
        this.mensajeError = 'Debes seleccionar un grupo.';
        return;
      }
    }

    if (this.vistaActual === 'clientes') {
      if (!payload.nombre || !payload.direccion || !payload.telefono || !payload.email) {
        this.mensajeError = 'Nombre, dirección, teléfono y email son obligatorios.';
        return;
      }
    }

    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.grupo;

    this.apiService.crearRegistro(this.vistaActual, payload).subscribe({
      next: () => {
        this.cerrarFormularios();
        this.cargarTabla(this.vistaActual, this.obtenerObservableActual());
      },
      error: (err) => {
        console.error('Error al crear registro:', err);
        this.mensajeError = 'No se pudo crear el registro.';
      }
    });
  }

  actualizarRegistro() {
    if (!this.idRegistroSeleccionado) {
      this.mensajeError = 'No se pudo identificar el ID para actualizar.';
      return;
    }

    const payload = { ...this.registroActual };

    delete payload.createdAt;
    delete payload.updatedAt;
    delete payload.grupo;

    this.apiService.actualizarRegistro(this.vistaActual, this.idRegistroSeleccionado, payload).subscribe({
      next: () => {
        this.cerrarFormularios();
        this.cargarTabla(this.vistaActual, this.obtenerObservableActual());
      },
      error: (err) => {
        console.error('Error al actualizar registro:', err);
        this.mensajeError = 'No se pudo actualizar el registro.';
      }
    });
  }

  eliminar(row: any) {
    const id =
      row.id_usuario ||
      row.id_cliente ||
      row.id_grupo ||
      row.id_permiso ||
      row.id_recibo ||
      row.id;

    if (!id) {
      this.mensajeError = 'No se pudo identificar el ID del registro.';
      return;
    }

    if (confirm(`¿Estás seguro de eliminar el registro con ID ${id}?`)) {
      this.apiService.eliminarRegistro(this.vistaActual, id).subscribe({
        next: () => {
          this.cargarTabla(this.vistaActual, this.obtenerObservableActual());
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          this.mensajeError = 'No se pudo eliminar el registro.';
        }
      });
    }
  }

  obtenerObservableActual() {
    switch (this.vistaActual) {
      case 'usuarios':
        return this.apiService.getUsuarios();
      case 'clientes':
        return this.apiService.getClientes();
      case 'grupos':
        return this.apiService.getGrupos();
      case 'permisos':
        return this.apiService.getPermisos();
      case 'grupoPermisos':
        return this.apiService.getGrupoPermisos();
      case 'recibos':
        return this.apiService.getRecibos();
      default:
        return this.apiService.getUsuarios();
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}