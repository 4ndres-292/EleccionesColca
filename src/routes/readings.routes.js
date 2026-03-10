import express from "express";

import {
    listReadings,
    addReading,
    readingsByHouse,
    readingsByGestion
} from "../controllers/readings.controller.js";

const router = express.Router();

// obtener lecturas
router.get("/", listReadings);

// registrar lectura
router.post("/", addReading);

// lecturas de una casa
router.get("/house/:house_id", readingsByHouse);

// lecturas de una gestión
router.get("/gestion/:gestion_id", readingsByGestion);

export default router;