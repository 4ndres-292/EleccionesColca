import {
    getAllGestions,
    createGestion,
    getCurrentGestion
} from "../models/gestions.model.js";


export const listGestions = async (req, res) => {

    try {

        const gestions = await getAllGestions();

        res.json(gestions);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};


export const addGestion = async (req, res) => {

    try {

        const { month, year } = req.body;

        const gestion = await createGestion(month, year);

        res.status(201).json(gestion);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};


export const currentGestion = async (req, res) => {

    try {

        const gestion = await getCurrentGestion();

        res.json(gestion);

    } catch (error) {

        res.status(500).json({ error: error.message });

    }

};