const mysql = require("mysql")
const dbConfig = require('../Config/db.config')

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DATABASE,
})

connection.connect((error) => {
    error
        ? console.log("deu erro para conectar aqui", error)
        : console.log("Banco de dados Conectado com sucesso")
})


module.exports = connection;