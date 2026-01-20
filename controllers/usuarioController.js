import UsuarioModel from '../models/Usuario.js';

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.obtenerTodos();
        res.render('usuarios/listas', { usuarios });
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
};

export const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        // Asumiendo que el modelo manejará la contraseña y el estado por defecto
        await UsuarioModel.crear({ nombre, email, password });
        res.redirect('/login'); // Redirigir al login después del registro
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear usuario');
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await UsuarioModel.buscarPorEmail(email);

        if (!usuario || usuario.password !== password) {
            // Nota: En producción usar bcrypt para comparar hashes
            return res.render('auth/login', { error: 'Credenciales inválidas' });
        }

        // Crear sesión
        req.session.user = usuario;
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el login');
    }
};

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};