import pool from "../db.js";

// obtener gestiones
export const getAllGestions = async () => {

    const result = await pool.query(`
        SELECT *
        FROM gestions
        ORDER BY year DESC, month DESC
    `);

    return result.rows;
};


// crear gestión
export const createGestion = async (month, year) => {

    const result = await pool.query(
        `INSERT INTO gestions (month, year)
         VALUES ($1,$2)
         RETURNING *`,
        [month, year]
    );

    return result.rows[0];
};


// obtener gestión actual
export const getCurrentGestion = async () => {

    const result = await pool.query(`
        SELECT *
        FROM gestions
        ORDER BY year DESC, month DESC
        LIMIT 1
    `);

    return result.rows[0];
};