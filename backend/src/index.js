const express = require("express");
const cors = require('cors');
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json()); //para converter json no corpo da requisição para javascript
app.use(routes);
app.listen(3333); // porta utilizada pelo servidor
