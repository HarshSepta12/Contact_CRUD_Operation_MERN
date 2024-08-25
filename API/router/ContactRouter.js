import express from "express";
import {AddData, DeleteData, getData, UpdateData} from "../controllers/ContactControllers.js";
const router = express.Router();

router.get("/", getData)
router.post("/add", AddData)
router.delete("/del/:id", DeleteData)
router.put("/update/:id", UpdateData)

export default router;