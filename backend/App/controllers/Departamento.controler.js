const Departamento = require('../models/Departamento.model')


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "o conteudo nao pode ser vazio"
        })
    }

    const departamento = new Departamento({
        descricao: req.body.descricao,
        empresa: req.body.empresa,
    })

    Departamento.create(departamento, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || " Algo de errado nao esta certo"
            })
        }
        else res.send(data)
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Não pode estar vazio a solicitação"
        })
    }

    Departamento.updateById(
        req.params.departamentoId,
        new Departamento(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    req.status(404).send({
                        message: `Não encontrado departamento id: ${req.params.departamentoId}`
                    })
                }
                else {
                    res.status(500).send({
                        message: "Aconteceu algum erro ao atualizar o departamento"
                    })
                }
            }
            else res.send(data)
        }
    )
}

exports.findOne = (req, res) => {
    Departamento.findById(req.params.departamentoId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Não encontramos nenhum departamento com o Id: ${req.params.departamentoId}`
                })
            } else {
                req.status(500).send({
                    message: "Erro ao tentar consultar departamento"
                })
            }

        }
        else res.send(data);
    })
}

exports.findAll = (req,res) => {

    Departamento.getAll((err,data) =>{
        if(err){
            res.status(500).send ({
                message: err.message || " Algum erro ocorreu ao consultar departamentos"
            })
        }
        else res.send(data);
    })


}