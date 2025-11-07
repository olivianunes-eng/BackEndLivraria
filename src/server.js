// ============================
//  Dependências
// ============================
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import usuarioRoutes from "./routes/usuario.routes.js";
import livrosRoutes from "./routes/livros.routes.js";
import avaliacoesRoutes from "./routes/avaliacoes.routes.js";

// ============================
//  Configuração do servidor
// ============================
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// ============================
//  Rota inicial
// ============================
app.get("/", (req, res) => {
  res.send("API funcionando!");
});

// ============================
//  Rotas
// ============================
app.use("/usuarios", usuarioRoutes);
app.use("/livros", livrosRoutes);
app.use("/avaliacoes", avaliacoesRoutes);

// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

import reservasRoutes from "./routes/reservas.routes.js";
import favoritosRoutes from "./routes/favoritos.routes.js";

app.use("/reservas", reservasRoutes);
app.use("/favoritos", favoritosRoutes);





