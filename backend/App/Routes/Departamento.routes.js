module.exports = app => {
    const departamento = require('../controllers/Departamento.controler')

    app.post("/departamentos", departamento.create)
    app.get("/departamentos", departamento.findAll)
    app.get("/departamentos/:departamentoId", departamento.findOne)
    app.put("/departamentos/:departamentoId", departamento.update)
}