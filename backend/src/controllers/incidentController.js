const connection = require('../database/connection');

module.exports = {
    async index(req, res) {
        //paginação simples de casos
        const { page = 1 } = req.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .limit(5)
        .offset((page -1) * 5)
        .select('*');

        //Para contar todas os registros no cabeçalho da resposta,
        //facilitando assim apresentação de páginas via frontend.
        res.header('X-Total-Count', count['count(*)']);

        return res.json(incidents);
    },

    async create(req, res) {
        const { title, description, value } = req.body;

        const ong_id = req.headers.authorization;
    
        const [id] = await connection("incidents").insert({
          title,
          description,
          value,
          ong_id
        });
    
        return res.json({ id });
    },

    async delete(req, res) {
        const { id } = req.params;
        const ong_id = req.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id != ong_id) {
            return res.status(401).json({ error: 'Operation not permitted' });
        }

        await connection('incidents').where('id', id).delete();

        return res.status(204).send();
    }
};