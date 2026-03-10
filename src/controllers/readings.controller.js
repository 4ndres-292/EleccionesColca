import {
    getAllReadings,
    getReadingsByHouse,
    getReadingsByGestion,
    createReading,
    getPreviousReading
} from "../models/readings.model.js";


// listar lecturas
export const listReadings = async (req, res) => {
    try {

        const readings = await getAllReadings();

        res.json(readings);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }
};


// lecturas por casa
export const readingsByHouse = async (req, res) => {

    try {

        const readings = await getReadingsByHouse(
            req.params.house_id
        );

        res.json(readings);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};


// lecturas por gestión
export const readingsByGestion = async (req, res) => {

    try {

        const readings = await getReadingsByGestion(
            req.params.gestion_id
        );

        res.json(readings);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};


// registrar lectura
export const addReading = async (req, res) => {

    try {

        const { house_id, gestion_id, reading_value, comment } = req.body;

        const previous = await getPreviousReading(
            house_id,
            gestion_id
        );

        const reading = await createReading(
            house_id,
            gestion_id,
            reading_value,
            comment
        );

        const previous_value = previous?.reading_value || 0;

        const consumption = reading_value - previous_value;

        res.status(201).json({

            reading,
            previous_reading: previous_value,
            consumption

        });

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};