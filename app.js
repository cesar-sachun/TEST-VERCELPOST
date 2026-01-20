import express from "express";
import ejs from "ejs";
import routes from "./routes.js";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("public"));
app.use("/", routes);
app.use("/usuarios", usuarioController);
app.listen(3050, () => {
    console.log("Server started on port http://localhost:3050");
});