import express from "express";
import {
    listarReservas,
    criarReserva,
    excluirReserva,
    listarReservasAtivas
} from "../controllers/reservas.controller.js";

const router = express.Router();

router.get("/", listarReservas);
router.post("/", criarReserva);
router.delete("/:id", excluirReserva);


router.get("/ativas", listarReservasAtivas);

export default router;
