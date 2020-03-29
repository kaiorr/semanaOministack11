const express = require("express");
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json()); //para converter json no corpo da requisição para javascript
app.use(routes);
app.use(errors());
app.listen(3333); // porta utilizada pelo servidor
