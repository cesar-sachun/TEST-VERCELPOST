import express from "express";
import { listarUsuarios, crearUsuario, login, logout } from "./controllers/usuarioController.js";
import { isAuthenticated, isGuest, isPremium } from "./middlewares/authMiddleware.js";


const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

// Auth Routes (Guest only)
router.get("/login", isGuest, (req, res) => {
    res.render("auth/login", { error: null });
});
router.post("/login", isGuest, login);

router.get("/registro", isGuest, (req, res) => {
    res.render("auth/registro");
});
router.post("/registro", isGuest, crearUsuario);

router.get("/logout", isAuthenticated, logout);

// Protected Routes
router.get("/usuarios", isAuthenticated, listarUsuarios);
router.post("/usuarios", isAuthenticated, crearUsuario); // Maybe only admin? Leaving as isAuthenticated for now

router.get("/gratuito", (req, res) => {
    res.render("contenido/gratuito");
});

router.get("/premium", isAuthenticated, isPremium, (req, res) => {
    res.render("contenido/premium");
});

export default router;
