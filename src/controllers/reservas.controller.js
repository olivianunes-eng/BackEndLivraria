import db from "../config/db.js";

// LISTAR TODAS AS RESERVAS
export const listarReservas = async (req, res) => {
    try {
        const sql = `
            SELECT r.*, 
                   u.nome AS usuario_nome,
                   l.titulo AS livro_titulo
            FROM reservas r
            JOIN usuarios u ON u.id = r.usuario_id
            JOIN livros l ON l.id = r.livro_id
        `;
        const [rows] = await db.query(sql);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// CRIAR RESERVA
export const criarReserva = async (req, res) => {
    try {
        const { usuario_id, livro_id, data_retirada, data_devolucao } = req.body;

        if (!usuario_id || !livro_id || !data_retirada || !data_devolucao) {
            return res.status(400).json({ erro: "Preencha todos os campos!" });
        }

        // ✅ Verifica se o livro está ativo antes de reservar
        const [livro] = await db.query("SELECT ativo FROM livros WHERE id = ?", [livro_id]);
        if (livro.length === 0 || livro[0].ativo === 0) {
            return res.status(400).json({ erro: "Livro não está ativo para reserva!" });
        }

        const sql = `
            INSERT INTO reservas (usuario_id, livro_id, data_retirada, data_devolucao)
            VALUES (?, ?, ?, ?)
        `;
        await db.query(sql, [usuario_id, livro_id, data_retirada, data_devolucao]);

        res.json({ mensagem: "Reserva criada com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};

// EXCLUIR RESERVA
export const excluirReserva = async (req, res) => {
    try {
        const { id } = req.params;

        const sql = "DELETE FROM reservas WHERE id = ?";
        await db.query(sql, [id]);

        res.json({ mensagem: "Reserva excluída com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};


export const listarReservasAtivas = async (req, res) => {
    try {
        const sql = `
            SELECT * FROM reservas
            WHERE data_devolucao >= CURDATE()
        `;
        const [rows] = await db.query(sql);

        res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
};
