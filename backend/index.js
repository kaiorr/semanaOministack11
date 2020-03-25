const express = require('express');

const app = express();

app.use(express.json()); //para converter json no corpo da requisição para javascript


app.post('/users', (req, res) => {
    const body = req.body;

    console.log(body);

    return res.json({
        evento: 'Semana Oministack 11',
        aluno: 'Kaio Ribeiro'
    });
});

app.listen(3333);
