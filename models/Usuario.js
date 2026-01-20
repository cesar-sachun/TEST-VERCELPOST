import { sql } from '@vercel/postgres';

class UsuarioModel {

    // Obtener todos los usuarios
    static async obtenerTodos() {
        try {
            const { rows } = await sql`SELECT * FROM usuarios ORDER BY id DESC`;
            return rows;
        } catch (error) {
            console.error('Error obteniendo usuarios:', error);
            throw error;
        }
    }

    // Buscar usuario por email
    static async buscarPorEmail(email) {
        try {
            const { rows } = await sql`SELECT * FROM usuarios WHERE email = ${email}`;
            return rows[0];
        } catch (error) {
            console.error('Error buscando usuario:', error);
            throw error;
        }
    }

    // Crear un nuevo usuario
    static async crear({ nombre, email, password }) {
        try {
            const { rows } = await sql`
        INSERT INTO usuarios (nombre, email, password) 
        VALUES (${nombre}, ${email}, ${password})
        RETURNING *;
      `;
            return rows[0];
        } catch (error) {
            console.error('Error creando usuario:', error);
            throw error;
        }
    }
}

export default UsuarioModel;