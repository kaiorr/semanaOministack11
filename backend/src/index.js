const express = require("express");
const routes = require("./routes");

const app = express();
app.use(express.json()); //para converter json no corpo da requisição para javascript
app.use(routes);
app.listen(3333); // porta utilizada pelo servidor
