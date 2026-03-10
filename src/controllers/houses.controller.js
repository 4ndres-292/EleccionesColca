import {
    getAllHouses,
    getHouseById,
    createHouse,
    updateHouse,
    deleteHouse
} from "../models/houses.model.js";

// listar casas
export const listHouses = async (req, res) => {
    try {
        const houses = await getAllHouses();
        res.json(houses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

// obtener casa por id
export const getHouse = async (req, res) => {
    try {
        const house = await getHouseById(req.params.id);
        res.json(house);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// crear casa
export const addHouse = async (req, res) => {
    try {
        const { house_code, owner_name, order_position } = req.body;

        const house = await createHouse(
            house_code,
            owner_name,
            order_position
        );

        res.status(201).json(house);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// actualizar casa
export const editHouse = async (req, res) => {
    try {
        const house = await updateHouse(
            req.params.id,
            req.body.owner_name
        );

        res.json(house);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// eliminar casa
export const removeHouse = async (req, res) => {
    try {
        await deleteHouse(req.params.id);
        res.json({ message: "Casa eliminada" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};