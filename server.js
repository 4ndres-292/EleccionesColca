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

app.post("/houses", async (req, res) => {
    try {
        const { house_code, owner_name, order_position } = req.body;

        const result = await pool.query(
            `INSERT INTO houses (house_code, owner_name, order_position)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [house_code, owner_name, order_position]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.get("/houses", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM houses
             ORDER BY order_position ASC`
        );

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Puerto dinámico: Render asigna process.env.PORT, si no existe usamos 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));