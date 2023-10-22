import express from "express";
import specialistListService from "../services/specialistListService";

const router = express.Router();

router.get("/", (_req,res) => {
    res.send(specialistListService());
});

export default router;