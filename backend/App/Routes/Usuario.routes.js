module.exports = app => {
    const usuario = require('../controllers/Usuario.controler')

    app.post("/usuario", usuario.create)
    app.get("/usuario/:usuarioId", usuario.findOne)
    app.get("/usuario", usuario.findAll)
    app.put("/login", usuario.login)
    app.put("/usuario/:usuarioId", usuario.update)
}