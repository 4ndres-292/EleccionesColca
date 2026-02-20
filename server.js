import express from "express";
import pool from "./db.js";

const app = express();

app.get("/", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json(result.rows);
    } catch (err) {
    console.error(err);
        res.status(500).send(err.message);
    }
});

app.listen(3000, () => console.log("Servidor corriendo"));