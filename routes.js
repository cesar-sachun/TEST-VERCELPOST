import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/usuarios", listarUsuarios);
router.post("/usuarios", crearUsuario);

export default router;
