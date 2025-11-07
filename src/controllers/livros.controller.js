import  db from "../config/db.js";

// LISTAR TODOS OS LIVROS
export const listarLivros = async (req, res) => {
  try {
    
    const [rows] = await db.query("SELECT * FROM livros WHERE ativo = 1");
    res.json(rows);
  } catch (err) {
    res.status(500).json({
      erro: "Erro ao listar livros",
      detalhes: err.message,
    });
  }
};

// BUSCAR UM LIVRO POR ID
export const buscarLivro = async (req, res) => {
  try {
    const { id } = req.params;
   

    const [rows] = await db.query("SELECT * FROM livros WHERE id = ?", [id]);

    if (rows.length === 0)
      return res.status(404).json({ mensagem: "Livro não encontrado" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({
      erro: "Erro ao buscar livro",
      detalhes: err.message,
    });
  }
};

// CRIAR LIVRO
export const criarLivro = async (req, res) => {
  try {
   
    const {
      titulo,
      autor,
      genero,
      editora,
      ano_publicacao,
      isbn,
      idioma,
      formato,
      caminho_capa,
      sinopse,
    } = req.body;

    const [result] = await db.query(
      `INSERT INTO livros 
      (titulo, autor, genero, editora, ano_publicacao, isbn, idioma, formato, caminho_capa, sinopse) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        titulo,
        autor,
        genero,
        editora,
        ano_publicacao,
        isbn,
        idioma,
        formato,
        caminho_capa,
        sinopse,
      ]
    );

    res.status(201).json({
      id: result.insertId,
      mensagem: "Livro criado com sucesso",
    });
  } catch (err) {
    res.status(500).json({
      erro: "Erro ao criar livro",
      detalhes: err.message,
    });
  }
};

// ATUALIZAR LIVRO
export const atualizarLivro = async (req, res) => {
  try {
    const { id } = req.params;
    const campos = req.body;
    

    // monta dinamicamente o SQL do update
    const chaves = Object.keys(campos);
    const valores = Object.values(campos);
    const setSQL = chaves.map((c) => `${c} = ?`).join(", ");

    await db.query(`UPDATE livros SET ${setSQL} WHERE id = ?`, [
      ...valores,
      id,
    ]);

    res.json({ mensagem: "Livro atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({
      erro: "Erro ao atualizar livro",
      detalhes: err.message,
    });
  }
};

// EXCLUIR LIVRO
export const excluirLivro = async (req, res) => {
  try {
    const { id } = req.params;
   

    await db.query("DELETE FROM livros WHERE id = ?", [id]);

    res.json({ mensagem: "Livro excluído com sucesso" });
  } catch (err) {
    res.status(500).json({
      erro: "Erro ao excluir livro",
      detalhes: err.message,
    });
  }
};

// LISTAR LIVROS COM MÉDIA DE NOTAS
export const livrosComAvaliacoes = async (req, res) => {
  try {
    const db = await getDB();

    const [rows] = await db.query(`
      SELECT 
        l.id,
        l.titulo,
        ROUND(AVG(a.nota), 2) AS media_notas,
        COUNT(a.id) AS total_avaliacoes,
        MAX(a.comentario) AS exemplo_comentario
      FROM livros l
      LEFT JOIN avaliacoes a ON l.id = a.livro_id
      GROUP BY l.id
      ORDER BY media_notas DESC;
    `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({
      erro: "Erro ao buscar avaliações dos livros",
      detalhes: err.message,
    });
  }
};

