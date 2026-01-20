import "dotenv/config";
import express from "express";
import session from "express-session";
import ejs from "ejs";
import routes from "./routes.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

// Necesario para que las cookies funcionen en Vercel (detrás de proxy HTTPS)
app.set('trust proxy', 1);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Configuración de Session
app.use(session({
    secret: process.env.SESSION_SECRET || 'mi_secreto_super_seguro',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 60 * 1000, // 10 minutos
        secure: process.env.NODE_ENV === 'production', // True solo en producción (HTTPS)
        httpOnly: true
    }
}));

// Middleware para hacer disponible el usuario en todas las vistas
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.use("/", routes);

app.listen(3050, () => {
    console.log("Server started on port http://localhost:3050");
});