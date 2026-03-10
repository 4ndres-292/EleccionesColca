import express from "express";

import {
    listHouses,
    getHouse,
    addHouse,
    editHouse,
    removeHouse
} from "../controllers/houses.controller.js";

const router = express.Router();

router.get("/", listHouses);

router.get("/:id", getHouse);

router.post("/", addHouse);

router.put("/:id", editHouse);

router.delete("/:id", removeHouse);

export default router;