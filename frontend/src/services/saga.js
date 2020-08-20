import {
    login, setActiveUser, setCompany, initialPushCompany,
    addCompany, addCompanyState, editCompany, setDepartamento, initialPushDepartamento,
    addDepartamento, addDepartamentoState, editDepartamento, setUser, initialPushUser,
    addUserState, editUser, setListaQuestionario, initialPushQuestao, setQuestaoDetails,
    saveQuestao, saveRespostas, setRespostasState, getRespostasState
} from '../store/main'
import { all, call, takeLatest, takeEvery, select, put } from 'redux-saga/effects'
import { useDispatch } from 'react-redux'

export async function getlogin(request) {
    const link = "http://localhost:3000/login"
    const body = {
        method: "PUT",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            email: request.email,
            senha: request.senha,
            "teste": "teste",
        })
    }
    const processDataRequest = await fetch(link, body)

    if (processDataRequest.ok) {
        return await processDataRequest.json()
    } else {
        throw processDataRequest
    }

}

export function* loginSaga(request) {

    try {
        const processData = yield call(getlogin, {
            email: request.payload.email,
            senha: request.payload.senha,
        })
        yield put(setActiveUser(processData))
    } catch (err) {
        console.log('erro ao efetuar o login :', err)
    }

}


export async function getCompanies(request) {
    const link = "http://localhost:3000/empresas"
    const body = {
        method: "GET",
        headers: { 'content-type': 'application/json' }
    }
    const processDataRequest = await fetch(link, body)
    const dataRequest = processDataRequest.json()
    console.log(dataRequest)
    return (dataRequest)

}

export function* getCompaniesSaga(request) {

    try {
        const processData = yield call(getCompanies, {})
        console.log(processData)
        yield put(setCompany(processData))
    } catch (err) {
        console.log("erro ao pegar as empresas : ", err)
    }
}


export async function addCompanyAsync(request) {
    const link = "http://localhost:3000/empresas"
    const body = {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            nome: request.nome,
            endereco: request.endereco,
            CNPJ: request.CNPJ,
            cidade: request.cidade,
            UF: request.uf,
            telefone: request.telefone,
            email: request.email,
        })
    }
    const processDataRequest = await fetch(link, body)
    if (processDataRequest.ok) {
        return await processDataRequest.json()
    } else {
        throw processDataRequest
    }

}

export function* addCompanySaga(request) {
    try {
        const processData = yield call(addCompanyAsync, {
            nome: request.payload.nome,
            endereco: request.payload.endereco,
            CNPJ: request.payload.CNPJ,
            cidade: request.payload.cidade,
            uf: request.payload.uf,
            telefone: request.payload.telefone,
            email: request.payload.email,
        })
        yield put(initialPushCompany())
    } catch (err) {
        console.log('erro ao adicionar uma nova empresa: ', err)
    }
}


export async function editCompanyAsync(request) {

    const link = "http://localhost:3000/empresas/" + request.id

    const body = {
        method: "PUT",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            nome: request.nome,
            endereco: request.endereco,
            CNPJ: request.CNPJ,
            cidade: request.cidade,
            UF: request.uf,
            telefone: request.telefone,
            email: request.email,
        })
    }

    const processDataRequest = await fetch(link, body)
    if (processDataRequest.ok) {
        return await processDataRequest.json()
    } else {
        throw processDataRequest
    }

}

export function* editCompanySaga(request) {
    try {
        const processData = yield call(editCompanyAsync, {
            nome: request.payload.nome,
            endereco: request.payload.endereco,
            CNPJ: request.payload.CNPJ,
            cidade: request.payload.cidade,
            uf: request.payload.uf,
            telefone: request.payload.telefone,
            email: request.payload.email,
            id: request.payload.id,
        })
        yield put(initialPushCompany())
    } catch (err) {
        console.log('erro ao editar empresa: ', err)
    }
}


//-----------------------------------//


export async function getDepartamentos(request) {
    const link = "http://localhost:3000/departamentos"
    const body = {
        method: "GET",
        headers: { 'content-type': 'application/json' }
    }
    const processDataRequest = await fetch(link, body)
    const dataRequest = processDataRequest.json()
    console.log(dataRequest)
    return (dataRequest)

}

export function* getDepartamentosSaga(request) {

    try {
        const processData = yield call(getDepartamentos, {})
        console.log(processData)
        yield put(setDepartamento(processData))
    } catch (err) {
        console.log("erro ao pegar os Departamentos : ", err)
    }
}


export async function addDepartamentoAsync(request) {
    const link = "http://localhost:3000/departamentos"
    const body = {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            descricao: request.descricao,
            empresa: request.empresa,
        })
    }
    const processDataRequest = await fetch(link, body)
    if (processDataRequest.ok) {
        return await processDataRequest.json()
    } else {
        throw processDataRequest
    }

}

export function* addDepartamentoSaga(request) {
    try {
        const processData = yield call(addDepartamentoAsync, {
            descricao: request.payload.descricao,
            empresa: request.payload.empresa,
        })
        yield put(initialPushDepartamento())
    } catch (err) {
        console.log('erro ao adicionar um novo departamento: ', err)
    }
}


export async function editDepartamentoAsync(request) {

    const link = "http://localhost:3000/departamentos/" + request.id

    const body = {
        method: "PUT",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            descricao: request.descricao,
            empresa: request.empresa,
        })
    }

    const processDataRequest = await fetch(link, body)
    if (processDataRequest.ok) {
        return await processDataRequest.json()
    } else {
        throw processDataRequest
    }

}

export function* editDepartamentoSaga(request) {
    try {
        const processData = yield call(editDepartamentoAsync, {
            descricao: request.payload.descricao,
            empresa: request.payload.empresa,
            id: request.payload.id,
        })
        yield put(initialPushDepartamento())
    } catch (err) {
        console.log('erro ao editar empresa: ', err)
    }
}


//-----------------------------------//


export async function getUsers(request) {
    const link = "http://localhost:3000/usuario"
    const body = {
        method: "GET",
        headers: { 'content-type': 'application/json' }
    }
    const processDataRequest = await fetch(link, body)
    const dataRequest = processDataRequest.json()
    console.log(dataRequest)
    return (dataRequest)

}

export function* getUsersSaga(request) {

    try {
        const processData = yield call(getUsers, {})
        console.log(processData)
        yield put(setUser(processData))
    } catch (err) {
        console.log("erro ao pegar os Departamentos : ", err)
    }
}


export async function addUserAsync(request) {
    const link = "http://localhost:3000/usuario"
    const body = {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            nome: request.descricao,
            empresa: request.empresa,
            email: request.email,
            status: request.status,
            senha: request.senha,
            tipo: request.tipo,
            departamento: request.departamento
        })
    }
    const processDataRequest = await fetch(link, body)
    if (processDataRequest.ok) {
        return await processDataRequest.json()
    } else {
        throw processDataRequest
    }

}

export function* addUserSaga(request) {
    try {
        const processData = yield call(addUserAsync, {
            nome: request.payload.descricao,
            empresa: request.payload.empresa,
            email: request.payload.email,
            status: request.payload.status,
            senha: request.payload.senha,
            tipo: request.payload.tipo,
            departamento: request.payload.departamento
        })
        yield put(initialPushUser())
    } catch (err) {
        console.log('erro ao adicionar um novo usuario: ', err)
    }
}


export async function editUserAsync(request) {

    const link = "http://localhost:3000/usuario/" + request.id

    const body = {
        method: "PUT",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            nome: request.nome,
            empresa: request.empresa,
            email: request.email,
            status: request.status,
            senha: request.senha,
            tipo: request.tipo,
            departamento: request.departamento
        })
    }

    const processDataRequest = await fetch(link, body)
    if (processDataRequest.ok) {
        return await processDataRequest.json()
    } else {
        throw processDataRequest
    }

}

export function* editUserSaga(request) {
    try {
        const processData = yield call(editUserAsync, {
            nome: request.payload.nome,
            empresa: request.payload.empresa,
            email: request.payload.email,
            status: request.payload.status,
            senha: request.payload.senha,
            tipo: request.payload.tipo,
            departamento: request.payload.departamento,
            id: request.payload.id,
        })
        yield put(initialPushUser())
    } catch (err) {
        console.log('erro ao editar usuario: ', err)
    }
}

export async function getListaQuestionario(request) {
    let link = "http://localhost:3000/questionario"
    console.log("request.id", request.id)
    link = request.id ? link + '/' + request.id : link
    console.log("link: ", link)
    const body = {
        method: "PUT",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            user: request.user ?? undefined
        })
    }
    const processDataRequest = await fetch(link, body)
    const dataRequest = await processDataRequest.json()
    console.log("request", dataRequest)
    return (dataRequest)
}

export function* getListaQuestionarioSaga(request) {
    const id = request.payload?.id ?? null
    const user = request.payload?.user ?? null
    try {
        const processData = yield call(getListaQuestionario, { id, user })
        console.log("chegou aqui", processData)
        id
            ? yield put(setQuestaoDetails(processData.questionarioItens))
            : yield put(setListaQuestionario(processData))
    } catch (err) {
        console.log("Erro ao trazer a lista de questionario", err)
    }
}

export async function postQuestionario(request) {
    const link = "http://localhost:3000/questionario"
    const body = {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request)
    }
    const processDataRequest = await fetch(link, body)
    const dataRequest = await processDataRequest.json()
    console.log("Request para salvar: ", dataRequest)
    return (dataRequest)
}

export function* postQuestionarioSaga(request) {
    try {
        const processData = yield call(postQuestionario, request.payload)
        console.log("salvou com sucesso")
    } catch (err) {
        console.log("erro ao salvar: ", err)
    }
}

export async function getRespostas(request) {
    const link = "http://localhost:3000/questionario/resposta"
    const body = {
        method: "PUT",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ questionario: request ? request : '' })
    }
    const processDataRequest = await fetch(link, body)
    const dataRequest = await processDataRequest.json()
    return (dataRequest)
}
export function* getRespostasSaga(request) {
    try {
        const processData = yield call(getRespostas, request.payload)
        yield put(setRespostasState(processData))
    } catch (err) {
        console.log("erro ao pegar as respostas: ", err)
    }
}

export async function postResposta(request) {
    const link = "http://localhost:3000/questionario/resposta"
    const body = {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(request)
    }
    const processDataRequest = await fetch(link, body)
    const dataRequest = await processDataRequest.json()
    console.log("Request para salvar as respostas : ", dataRequest)
    return (dataRequest)
}

export function* postRespostaSaga(request) {
    try {
        const processData = yield call(postResposta, request.payload)
        yield put(initialPushQuestao({ user: request.payload.user }))
        console.log("salvou com sucesso")
    } catch (err) {
        console.log("erro ao salvar as respostas: ", err)
    }
}




export function* rootSaga() {
    yield all([
        takeLatest(login.type, loginSaga),
        takeLatest(initialPushCompany.type, getCompaniesSaga),
        takeEvery(addCompanyState.type, addCompanySaga),
        takeEvery(editCompany.type, editCompanySaga),
        takeLatest(initialPushDepartamento.type, getDepartamentosSaga),
        takeEvery(addDepartamentoState.type, addDepartamentoSaga),
        takeEvery(editDepartamento.type, editDepartamentoSaga),
        takeLatest(initialPushUser.type, getUsersSaga),
        takeEvery(addUserState.type, addUserSaga),
        takeEvery(editUser.type, editUserSaga),
        takeEvery(saveQuestao.type, postQuestionarioSaga),
        takeEvery(saveRespostas.type, postRespostaSaga),
        takeLatest(initialPushQuestao.type, getListaQuestionarioSaga),
        takeLatest(getRespostasState.type, getRespostasSaga)
    ])
}