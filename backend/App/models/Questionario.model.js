const sql = require('./db')



const Questionario = function ({ questionarioDados, questoes, user }) {
    this.questionarioDados = { ...questionarioDados }
    this.questoes = questoes
    this.user = user
}

function gravaItens(questao) {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO questionario_itens SET ?", questao, (err, res) => {
            if (err) {
                console.log("erro ao inserir dados do item : ", err)
                reject(err)
            } if (res) {
                console.log(res)
                resolve({ id: res.insertId, ...questao })

            }
        })
    })
}

function gravaDados(questao) {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO questionario_dados SET ?", questao, (err, res) => {
            if (err) {
                console.log("erro ao inserir dados do header: ", err)
                reject(err)
            }
            if (res) {
                console.log(" conseguiu gravar o header: ", res)
                resolve({ id: res.insertId, ...questao })
            }
        })
    })
}

function gravaResultado(questao) {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO questionario_respondido (questionario,usuario) values (? ,?) ", [questao.questionarioDados.id, questao.user], (err, res) => {
            if (err) {
                console.log("erro ao salvar os dados de respondido : ", err)
                reject(err)
            }
            if (res) {
                console.log("Conseguiu salvar questionario respondido: ", res)
                resolve({ message: "Questionario respondido salvo com sucesso" })
            }
        })
    })
}

function gravaRespostas(questao) {
    return new Promise((resolve, reject) => {
        sql.query("INSERT INTO questionario_respostas (questionario_item,usuario,valor) values (?,?,?)",
            [questao.questionarioIten, questao.user, questao.valor], (err, res) => {
                if (err) {
                    console.log("erro ao salvar os valores respondido : ", err)
                    reject(err)
                }
                if (res) {
                    console.log("Conseguiu salvar o valor respondido: ", res)
                    resolve({ message: "Valor respondido salvo com sucesso" })
                }
            })
    })
}

Questionario.create = async ({ questionarioDados, questoes: questionarioItens }, result) => {
    console.log("questionario dados: ", questionarioDados)
    let resultado = {}

    try {
        resultado.questionarioDados = await gravaDados(questionarioDados)
    } catch (err) {
        result(err, null)
    }

    try {
        resultado.questoes = await Promise.all(
            questionarioItens.map(questao =>
                gravaItens({ questionario: resultado.questionarioDados.id, ...questao }))
        )
    }
    catch (err) {
        result(err, null)
    }

    result(null, resultado)

}

Questionario.resposta = async (questionario, result) => {
    console.log("questionairo: ", questionario)
    let resultado = {}

    try {
        resultado.respondido = await gravaResultado(questionario)
    } catch (err) {
        result(err, null)
    }
    try {
        resultado.questoes = await Promise.all(
            questionario.questoes.map(questao =>
                gravaRespostas({ questionarioIten: questao.id, user: questionario.user, valor: questao.value })
            )
        )
    } catch (err) {
        console.log("Erro ao gravar os itens: ", err)
    }

    result(null, resultado)
}

Questionario.getAll = (user, result) => {

    const select = user
        ? `select a.* from questionario_dados a `
        // where id not in (select questionario from questionario_respondido where questionario = a.id and usuario =${user} )
        : "SELECT a.*, count(b.id) as respondidos FROM questionario_dados a inner join questionario_respondido b on (a.id=b.questionario) group by a.id"

    console.log(user ? "tem usuario" : "nao tem usuario")
    sql.query(select, (err, res) => {
        if (err) {
            console.log("erro ao consultar a lista do questionario: ", err)
            result(err, null)
            return
        }

        result(null, res);
    })

}

function getRespostasTipo2(questao) {

    return new Promise((resolve, reject) => {
        let query = "SELECT * from respostasTipo2 "
        query += questao
            ? "where questionario = " + questao
            : ''
        sql.query(query, (err, res) => {
            if (err) {
                console.log("erro ao trazer as respostas :", err)
                reject(err)
            }
            if (res.length) {
                resolve(res)
                return
            }

            resolve('')
        })
    })
}
function getRespostasTipo1(questao) {

    return new Promise((resolve, reject) => {
        let query = "SELECT * from respostasTipo1 "
        query += questao
            ? "where questionario = " + questao
            : ''
        sql.query(query, (err, res) => {
            if (err) {
                console.log("erro ao trazer as respostas :", err)
                reject(err)
            }
            if (res.length) {
                resolve(res)
                return
            }

            resolve('')
        })
    })
}

Questionario.getRespostas = async (questao, result) => {

    let resultado = {}
    let tipo2 = {}
    let tipo1 = {}
    try {
        const data = await (getRespostasTipo2(questao ? questao : undefined))
        data.forEach(questao => {
            tipo2[questao.questionario]
                ? tipo2[questao.questionario].push({ ...questao })
                : tipo2[questao.questionario] = [{ ...questao }]
        })

    } catch (err) {
        tipo2.message = "Não tem questao do tipo 2"
    }
    try {
        const data = await (getRespostasTipo1(questao ? questao : undefined))
        data.forEach(questao => {
            tipo1[questao.questionario]
                ? tipo1[questao.questionario].push({ ...questao })
                : tipo1[questao.questionario] = [{ ...questao }]
        })


    } catch (err) {
        tipo1.message = "não tem questao do tipo 1"
    }





    const resultado2 = tipo1.message ? tipo1.message :
        Object.keys(tipo1).reduce((questionarios, questionario) => {
            questionarios[questionario] = tipo1[questionario].reduce((acc, { questao, valor, questaoDescaricao }) => {
                // se for o primeiro valor dessa questao, tem que inicializar
                acc[questao] = acc[questao] || {};
                // aqui a gente usa método impuro como exceção
                acc[questao].descricao = questaoDescaricao || '';
                acc[questao].value = acc[questao].value || [];
                acc[questao].value.push(valor);
                // retorna o acumulador com as questoes e suas arrays de valores
                return acc;
            }, /* valor inicial do acumulador (acc): */ {});
            return questionarios;
        }, /* valor inicial de questionarios: */ {});

    resultado.tipo2 = tipo2

    resultado.tipo1 = resultado2


    result(null, resultado)

}

Questionario.getDetails = (questionarioId, result) => {
    var resultado = {
        questionarioDados: {},
        questionarioItens: []
    }
    sql.query(`Select * from questionario_dados where id = ${questionarioId}`, (err, res) => {
        if (err) {
            console.log("Erro ao buscar questionario de id:", questionarioId)
            result(err, null)
            return
        }
        if (res.length) {
            console.log("Questionario Dados encontrado ", res[0])
            resultado.questionarioDados = res[0]
            sql.query(`Select b.* from questionario_dados a 
            inner join questionario_itens b on (a.id=b.questionario)
            where a.id =${resultado.questionarioDados.id}`, (err, res) => {
                if (err) {
                    console.log("Não encontrado itens para esse questionario")
                    result(err, null)
                    return
                }
                if (res.length) {
                    console.log("encontrado itens: ", res)
                    res.forEach(item => resultado.questionarioItens.push(item))
                    result(null, resultado)
                }
            })
            console.log(resultado)
            return
        }

        result({ kind: "not_found" }, null)
    })
}




module.exports = Questionario