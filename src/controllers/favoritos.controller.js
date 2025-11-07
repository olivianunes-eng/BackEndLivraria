import db from "../config/db.js";

// LISTAR TODOS OS FAVORITOS
export const listarFavoritos = async (req, res) => {
    try {
        const sql = `
            SELECT f.*, u.nome AS usuario_nome, l.titulo AS livro_titulo
            FROM favoritos f
            JOIN usuarios u ON u.id = f.usuario_id
            JOIN livros l ON l.id = f.livro_id
        `;
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// CRIAR FAVORITO
export const criarFavorito = async (req, res) => {
    try {
        const { usuario_id, livro_id } = req.body;

        if (!usuario_id || !livro_id) {
            return res.status(400).json({ erro: "Preencha todos os campos!" });
        }

        // ✅ Verifica se o livro está ativo
        const [livro] = await db.query("SELECT ativo FROM livros WHERE id = ?", [livro_id]);
        if (livro.length === 0 || livro[0].ativo === 0) {
            return res.status(400).json({ erro: "Livro não está ativo para favoritar!" });
        }

        const sql = `
            INSERT INTO favoritos (usuario_id, livro_id)
            VALUES (?, ?)
        `;
        await db.query(sql, [usuario_id, livro_id]);

        res.json({ mensagem: "Livro favoritado com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// EXCLUIR FAVORITO
export const excluirFavorito = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = "DELETE FROM favoritos WHERE id = ?";
        await db.query(sql, [id]);

        res.json({ mensagem: "Favorito removido com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// ✅ DESAFIO EXTRA – LISTAR FAVORITOS POR USUÁRIO
export const listarFavoritosPorUsuario = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = `
            SELECT f.*, l.titulo, l.autor
            FROM favoritos f
            JOIN livros l ON l.id = f.livro_id
            WHERE f.usuario_id = ?
        `;
        const [rows] = await db.query(sql, [id]);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};
