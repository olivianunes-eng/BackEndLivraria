import express from "express";
import {
  listarLivros,
  buscarLivro,
  criarLivro,
  atualizarLivro,
  excluirLivro,
  livrosComAvaliacoes
} from "../controllers/livros.controller.js";

const router = express.Router();

// ROTA BASE: /livros
router.get("/", listarLivros);
router.get("/:id", buscarLivro);
router.post("/", criarLivro);
router.put("/:id", atualizarLivro);
router.delete("/:id", excluirLivro);

// Extra: /livros/avaliacoes
router.get("/avaliacoes/listar", livrosComAvaliacoes);

export default router;



