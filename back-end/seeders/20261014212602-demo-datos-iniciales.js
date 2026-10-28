'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Insertar el catálogo de permisos que pide la guía
    await queryInterface.bulkInsert('Permisos', [
      { id: 1, nombre: 'frmventas', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nombre: 'frminventario', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nombre: 'frmcliente', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, nombre: 'frmproveedores', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, nombre: 'usuario', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, nombre: 'grupos', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, nombre: 'grupo_permisos', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, nombre: 'permisos', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // 2. Insertar los grupos de usuarios
    await queryInterface.bulkInsert('Grupos', [
      { id: 1, nombre: 'administrador', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nombre: 'ventas', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nombre: 'inventario', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, nombre: 'compras', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // 3. Asignar todos los permisos al grupo Administrador (id 1)
    await queryInterface.bulkInsert('GrupoPermisos', [
      { id: 1, grupoId: 1, permisoId: 1, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, grupoId: 1, permisoId: 2, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, grupoId: 1, permisoId: 3, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, grupoId: 1, permisoId: 4, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, grupoId: 1, permisoId: 5, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, grupoId: 1, permisoId: 6, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, grupoId: 1, permisoId: 7, createdAt: new Date(), updatedAt: new Date() },
      { id: 8, grupoId: 1, permisoId: 8, createdAt: new Date(), updatedAt: new Date() }
    ], {});

    // 4. Crear un usuario Administrador inicial con contraseña hasheada
    const passwordHash = await bcrypt.hash('123456789', 10);
    await queryInterface.bulkInsert('Usuarios', [
      {
        id: 1,
        login: 'admin',
        password: passwordHash,
        grupoId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
    await queryInterface.bulkDelete('GrupoPermisos', null, {});
    await queryInterface.bulkDelete('Grupos', null, {});
    await queryInterface.bulkDelete('Permisos', null, {});
  }
};