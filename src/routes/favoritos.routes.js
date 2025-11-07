import express from "express";
import {
    listarFavoritos,
    criarFavorito,
    excluirFavorito,
    listarFavoritosPorUsuario
} from "../controllers/favoritos.controller.js";

const router = express.Router();

router.get("/", listarFavoritos);
router.post("/", criarFavorito);
router.delete("/:id", excluirFavorito);


router.get("/usuario/:id", listarFavoritosPorUsuario);

export default router;
