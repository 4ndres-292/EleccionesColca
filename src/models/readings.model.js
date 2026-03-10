import pool from "../db.js";

// listar todas las lecturas
export const getAllReadings = async () => {
    const result = await pool.query(`
        SELECT * FROM meter_readings
        ORDER BY created_at DESC
    `);

    return result.rows;
};

// lecturas de una casa
export const getReadingsByHouse = async (house_id) => {
    const result = await pool.query(
        `SELECT *
         FROM meter_readings
         WHERE house_id = $1
         ORDER BY created_at DESC`,
        [house_id]
    );

    return result.rows;
};

// lecturas de una gestión
export const getReadingsByGestion = async (gestion_id) => {
    const result = await pool.query(
        `SELECT *
         FROM meter_readings
         WHERE gestion_id = $1`,
        [gestion_id]
    );

    return result.rows;
};

// obtener lectura anterior
export const getPreviousReading = async (house_id, gestion_id) => {

    const result = await pool.query(
        `SELECT reading_value
         FROM meter_readings
         WHERE house_id = $1
         AND gestion_id < $2
         ORDER BY gestion_id DESC
         LIMIT 1`,
        [house_id, gestion_id]
    );

    return result.rows[0];
};

// crear lectura
export const createReading = async (
    house_id,
    gestion_id,
    reading_value,
    comment
) => {

    const result = await pool.query(
        `INSERT INTO meter_readings
        (house_id, gestion_id, reading_value, comment)
        VALUES ($1,$2,$3,$4)
        RETURNING *`,
        [house_id, gestion_id, reading_value, comment]
    );

    return result.rows[0];
};