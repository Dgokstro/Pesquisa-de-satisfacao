const Questionario = require('../models/Questionario.model')

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "O conteudo nao pode ser vazio"
        })
    }
    const questionario = new Questionario({ ...req.body })
    console.log("Controler: ", questionario)

    Questionario.create(questionario, (err, data) => {

        if (err) {
            res.status(500).send({
                message: err.message || "Algo de errado nao esta certo"
            })
        }
        else res.send(data)

    })
}

exports.resposta = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "O conteudo nao pode ser vazio"
        })
    }
    const questionario = new Questionario({ ...req.body })
    console.log("controler: ", questionario)

    Questionario.resposta(questionario, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "algo de errado nao esta certo"
            })
        }
        else res.send(data)
    })
}

exports.findAll = (req, res) => {
    Questionario.getAll(req.body.user, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Erro ao trazer a lista de questionarios'
            })
        else res.send(data)
    })
}

exports.getDetails = (req, res) => {
    Questionario.getDetails(req.params.questionarioId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Não encontrado questionario com id=${req.questionarioId}`
                })
            } else {
                res.status(500).send({
                    message: "Erro ao tentar consultar detalhes do questionario"
                })
            }
        }
        else res.send(data)
    })
}

exports.getRespostas = (req, res) => {
    Questionario.getRespostas(req.body.questionario, (err, data) => {
        if (err) {
            res.status(404).send({
                message: 'algo de errado nao ta certo',
                erro: err
            })
        }
        else {
            res.send(data)
        }
    })
}