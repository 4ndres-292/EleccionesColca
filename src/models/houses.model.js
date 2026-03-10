import pool from "../db.js";

// Obtener todas las casas
export const getAllHouses = async () => {
    const result = await pool.query(
        "SELECT * FROM houses ORDER BY order_position"
    );
    return result.rows;
};

// Obtener casa por id
export const getHouseById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM houses WHERE id = $1",
        [id]
    );
    return result.rows[0];
};

// Crear casa
export const createHouse = async (house_code, owner_name, order_position) => {
    const result = await pool.query(
        `INSERT INTO houses (house_code, owner_name, order_position)
         VALUES ($1,$2,$3)
         RETURNING *`,
        [house_code, owner_name, order_position]
    );

    return result.rows[0];
};

// Actualizar casa
export const updateHouse = async (id, owner_name) => {
    const result = await pool.query(
        `UPDATE houses
         SET owner_name = $1
         WHERE id = $2
         RETURNING *`,
        [owner_name, id]
    );

    return result.rows[0];
};

// Eliminar casa
export const deleteHouse = async (id) => {
    await pool.query(
        "DELETE FROM houses WHERE id = $1",
        [id]
    );
};