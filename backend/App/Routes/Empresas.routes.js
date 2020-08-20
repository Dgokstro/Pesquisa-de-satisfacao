module.exports = app => {
    const empresas = require('../controllers/empresas.controller')

    app.post("/empresas", empresas.create)
    app.get("/empresas/:empresaId", empresas.findOne)
    app.get("/empresas", empresas.findAll)
    app.put("/empresas/:empresaId", empresas.update)
}