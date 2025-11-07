import  db  from "../config/db.js";

// LISTAR TODAS AS AVALIAÇÕES
export const listarAvaliacoes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        a.id,
        u.nome AS usuario,
        l.titulo AS livro,
        a.nota,
        a.comentario,
        a.data_avaliacao
      FROM avaliacoes a
      JOIN usuarios u ON a.usuario_id = u.id
      JOIN livros l ON a.livro_id = l.id
      ORDER BY a.data_avaliacao DESC;
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao listar avaliações" });
  }
};

// CRIAR UMA NOVA AVALIAÇÃO
export const criarAvaliacao = async (req, res) => {
  try {
    const { usuario_id, livro_id, nota, comentario } = req.body;
    const [result] = await db.query(
      "INSERT INTO avaliacoes (usuario_id, livro_id, nota, comentario) VALUES (?, ?, ?, ?)",
      [usuario_id, livro_id, nota, comentario]
    );
    res.status(201).json({ id: result.insertId, mensagem: "Avaliação cadastrada com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao criar avaliação" });
  }
};
