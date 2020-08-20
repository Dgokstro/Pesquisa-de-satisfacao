const sql = require('./db')

const Usuario = function (usuario) {

    this.empresa = usuario.empresa
    this.departamento = usuario.departamento
    this.nome = usuario.nome
    this.email = usuario.email
    this.status = usuario.status
    this.senha = usuario.senha
    this.tipo = usuario.tipo
}

Usuario.create = (newUsuario, result) => {
    console.log('vai executar a query')
    sql.query("INSERT INTO usuario SET ?", newUsuario, (err, res) => {
        console.log('executou a query')
        if (err) {
            console.log('Erro: ', err);
            result(err, null);
            return;
        }

        console.log("Criado Usuario: ", { id: res.insertId, ...newUsuario });
        result(null, { id: res.insertId, ...newUsuario });
    });
};

Usuario.findById = (usuarioId, result) => {
    sql.query(`SELECT * FROM usuario where id = ${usuarioId}`, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Usuario encontrada: ", res[0]);
            result(null, res[0])
            return
        }

        result({ kind: "not_found" }, null)

    })


}

Usuario.getAll = result => {
    sql.query("SELECT * FROM usuario", (err, res) => {
        if (err) {
            console.log("error, err")
            result(null, err);
            return
        }

        console.log("usuario: ", res);
        result(null, res);
    })
}

Usuario.updateById = (id, usuario, result) => {
    sql.query(
        "update usuario set empresa= ?, email= ?,status= ?, senha= ?, tipo=? , departamento =?, nome=? where id =?",
        [usuario.empresa, usuario.email, usuario.status, usuario.senha, usuario.tipo, usuario.departamento, usuario.nome, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return
            }

            if (res.affectedRows === 0) {
                result({ kind: "not_found" }, null)
                return
            }

            console.log("atualziado usuario : ", { id: id, ...usuario })
            result(null, { id: id, ...usuario })
        }
    )
}

Usuario.login = (email, senha, result) => {
    sql.query("select * from usuario where email=? and senha =?",
        [email, senha], (err, res) => {
            if (err) {
                console.log("error: ", err)
                result(err, null)
                return
            }
            if (res.length) {
               
                const retorno = {
                    tipo:res[0].tipo,
                    nome:res[0].nome,
                    status:res[0].status,
                    id:res[0].id,
                    departamento:res[0].departamento
                }
                console.log("Usuario encontrado: ", retorno)
                result(null, retorno)
                return
            }

            result({ kind: "not_found" }, null)
        })
}

module.exports = Usuario
