const Usuario = require('../models/Usuario.model')

exports.create = (req, res) => {
    console.log('criou um usuario')
    if (!req.body) {
        res.status(400).send({
            message: "o conteudo nao pode ser vazio"
        })
    }

    const usuario = new Usuario({
        nome: req.body.nome,
        email: req.body.email,
        empresa: req.body.empresa,
        status: req.body.status,
        senha: req.body.senha,
        tipo: req.body.tipo,
        departamento: req.body.departamento
    })
    console.log(usuario)
    Usuario.create(usuario, (err, data) => {
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
    Usuario.findById(req.params.usuarioId, (err, data) => {
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
    Usuario.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu ao trazer os Usuarios"
            });
        else res.send(data);
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Não pode estar vazio a  solicitação !"
        })
    }

    Usuario.updateById(
        req.params.usuarioId,
        new Usuario(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Não encontrado Usuario com esse id: ${req.params.usuarioId}`
                    })
                }
                else {
                    res.status(500).send({
                        message: " Aconteceu algum erro ao atualizar o usuario de ID " + req.params.usuarioId
                    })
                }
            }
            else res.send(data);
        }
    )
}

exports.login = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "O Corpo da solicitação nao pode estar vazio"
        })
    }
console.log(req.body)

    Usuario.login(
        req.body.email,
        req.body.senha,
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: "usuario ou senha nao localizado"
                    })
                }
                else {
                    res.status(500).send({
                        message: "Usuario e senha nao localizados"
                    })
                }
            }
            else res.send(data)
        })
}