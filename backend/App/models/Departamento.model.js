const sql = require('./db')

const Departamento = function (departamento) {
    this.descricao = departamento.descricao
    this.empresa = departamento.empresa
}

Departamento.create = (newDepartamento, result) => {
    sql.query("INSERT INTO departamento SET ?", newDepartamento, (err, res) => {
        if (err) {
            console.log('Erro: ', err);
            result(err, null);
            return
        }

        console.log('Criado Departamento: ', { id: res.insertId, ...newDepartamento })
        result(null, { id: res.insertId, ...newDepartamento })
    })
}

Departamento.findById = (departamentoId, result) => {
    sql.query("select * from departamento where id = ?", departamentoId, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }
        if (res.length) {
            console.log("Departamento encontrado: ", res[0])
            result(null, res[0])
            return
        }
        result({ kind: "not_found" }, null)
    })
}

Departamento.getAll = result => {
    sql.query("SELECT * FROM departamento", (err, res) => {
        if (err) {
            console.log("error ", err)
            result(err, null)
            return
        }

        console.log("Departamentos: ", res)
        result(null, res)
    })
}

Departamento.updateById = (id, departamento, result) => {
    sql.query("update departamento set descricao = ? where id=?",
        [departamento.descricao, id],
        (err, res) => {
            if(err){
                console.log ("error: ", err);
                result(err,null)
                return
            }
            if(res.affectedRows === 0){
                result ({ kind : "not_found"}, null)
                return
            }
            console.log("atualizada empresa : ", { id:id ,...departamento})
            result(null, {id:id,...departamento})
        }
    )


}


module.exports = Departamento