import express from "express";

import {
    listGestions,
    addGestion,
    currentGestion
} from "../controllers/gestions.controller.js";

const router = express.Router();

router.get("/", listGestions);

router.post("/", addGestion);

router.get("/current", currentGestion);

export default router;