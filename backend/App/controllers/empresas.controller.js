const Empresas = require('../models/Empresas.model')

exports.create = (req, res) => {
    console.log('criou uma empresa')
    if (!req.body) {
        res.status(400).send({
            message: "o conteudo nao pode ser vazio"
        })
    }

    const empresas = new Empresas({
        nome: req.body.nome,
        endereco: req.body.endereco,
        CNPJ: req.body.CNPJ,
        cidade: req.body.cidade,
        UF: req.body.UF,
        telefone: req.body.telefone,
        email: req.body.email
    })
    console.log(empresas)
    Empresas.create(empresas, (err, data) => {
        console.log('chamou o create')
        if (err)
            res.status(500).send({
                message:
                    err.message || "Aconteceu algum erro durante a gravação"
            });
        else res.send(data);
    })

}
exports.findOne = (req, res) => {
    Empresas.findById(req.params.empresaId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Não encontramos nenhuma empresa com esse Id = ${req.params.customerId}`
                });
            } else {
                res.status(500).send({
                    message: "Erro ao tentar consultar a empresa"
                })
            }
        }
        else res.send(data);
    })


}

exports.findAll = (req, res) => {
    Empresas.getAll((err, data) => {
        if (err) 
        res.status(500).send({
            message:
             err.message || "Algum erro ocorreu ao trazer as empresas"
        });
        else res.send(data);
    })
}

exports.update = (req, res) => {
    if(!req.body) {
        res.status(400).send ({
            message: "Não pode estar vazio a  solicitação !"
        })
    }

    Empresas.updateById (
        req.params.empresaId,
        new Empresas (req.body),
        (err,data) => {
            if(err) {
                if(err.kind === "not_found") {
                    res.status(404).send ({
                        message:`Não encontrado empresa com esse id: ${ req.params.empresaid}`
                    })
                }
                else {
                    res.status(500).send ({
                        message: " Aconteceu algum erro ao atualizar a empresa de ID " + req.params.empresaid
                    })
                }
            }
            else res.send(data);
        }
    )
}