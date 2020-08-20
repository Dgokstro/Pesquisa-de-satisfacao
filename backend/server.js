const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.json({ message: " Bem vindo ao backend do Projeto" });
})

require("./app/routes/Empresas.routes.js")(app);
require("./app/routes/Departamento.routes.js")(app);
require("./app/routes/Usuario.routes.js")(app);
require("./app/routes/Questionario.routes.js")(app);

app.listen(3000, () => {
    console.log('Server is running on port 3000.')
})