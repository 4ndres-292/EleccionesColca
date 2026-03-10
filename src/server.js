import express from "express";
import pool from "./db.js";

import housesRoutes from "./routes/houses.routes.js";
import readingsRoutes from "./routes/readings.routes.js";
import gestionsRoutes from "./routes/gestions.routes.js";

const app = express();

//Middleware global
app.use(express.json());

//Rutas
app.use("/houses", housesRoutes);
app.use("/readings", readingsRoutes);
app.use("/gestions", gestionsRoutes);

app.get("/", async (req, res) => {
    try{
        const result = await pool.query("SELECT NOW()");
        res.json({ server_time: result.rows[0].now });
    } catch (err){
        console.error(err);
        res.status(500).json({ error: err.message});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));