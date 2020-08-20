const sql = require('./db')

const Empresa = function (empresa) {
    this.nome = empresa.nome;
    this.endereco = empresa.endereco;
    this.CNPJ = empresa.CNPJ;
    this.cidade = empresa.cidade;
    this.UF = empresa.UF;
    this.telefone = empresa.telefone;
    this.email = empresa.email;
};

Empresa.create = (newEmpresa, result) => {
    console.log('vai executar a query')
    sql.query("INSERT INTO empresas SET ?", newEmpresa, (err, res) => {
        console.log('executou a query')
        if (err) {
            console.log('Erro: ', err);
            result(err, null);
            return;
        }

        console.log("Criada Empresa: ", { id: res.insertId, ...newEmpresa });
        result(null, { id: res.insertId, ...newEmpresa });
    });
};

Empresa.findById = (empresaId, result) => {
    sql.query(`SELECT * FROM empresas where id = ${empresaId}`, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null);
            return;
        }
        if (res.length) {
            console.log("Empresa encontrada: ", res[0]);
            result(null, res[0])
            return
        }

        result({ kind: "not_found" }, null)

    })


}

Empresa.getAll = result => {
    sql.query("SELECT * FROM empresas", (err, res) => {
        if (err) {
            console.log("error, err")
            result(null, err);
            return
        }

        console.log("empresas: ", res);
        result(null, res);
    })
}

Empresa.updateById = (id, empresa, result) => {
    sql.query(
        "update empresas set nome= ?, endereco= ?, CNPJ= ?,cidade= ?, uf= ?, telefone=? , email =? where id =?",
        [empresa.nome, empresa.endereco, empresa.CNPJ, empresa.cidade, empresa.UF, empresa.telefone, empresa.email, id],
        (err, res) => {
            if (err) {
                console.log ("error: ", err);
                result(null,err);
                return
            }

            if(res.affectedRows === 0) {
                result ( { kind:"not_found"}, null)
                return
            }

            console.log("atualziada empresa : ", { id:id,...empresa})
            result(null, {id:id,...empresa})
        }
    )
}


module.exports = Empresa;