import UsuarioModel from '../models/Usuario.js';

export const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await UsuarioModel.obtenerTodos();
        res.render('usuarios/lista', { usuarios });
    } catch (error) {
        res.status(500).send('Error interno del servidor');
    }
};

export const crearUsuario = async (req, res) => {
    try {
        const { nombre, email } = req.body;
        await UsuarioModel.crear({ nombre, email });
        res.redirect('/usuarios'); // Recargamos para ver el nuevo usuario
    } catch (error) {
        res.status(500).send('Error al crear usuario');
    }
};