module.exports = app => {
    const questionario = require('../controllers/Questionario.controler')

    app.post("/questionario", questionario.create)
    app.put("/questionario", questionario.findAll)
    app.put("/questionario/resposta", questionario.getRespostas)
    app.put("/questionario/:questionarioId", questionario.getDetails)
    app.post("/questionario/resposta", questionario.resposta)
}