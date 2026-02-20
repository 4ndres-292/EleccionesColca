// server.js
import express from "express";
import pool from "./db.js";

const app = express();

// Middleware para leer JSON en request body
app.use(express.json());

// Endpoint de prueba
app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

// Puerto dinámico: Render asigna process.env.PORT, si no existe usamos 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));