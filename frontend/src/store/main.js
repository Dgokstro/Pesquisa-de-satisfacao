import {
    createSlice,
    PayloadAction,
    combineReducers,
    configureStore,
    getDefaultMiddleware
} from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from '../services/saga'
import { findIndex, propEq } from 'ramda'


export const loginSlice = createSlice({
    name: "login",
    initialState: {
        "tipo": 0,
        "nome": '',
        "status": 0,
        "id": 0,
        "departamento": 0,
    },
    reducers: {
        setActiveUser(state, { payload }) {
            return { ...state, ...payload }
        },
        login(state, { payload }) {
            return { ...state }
        }
    }
})

export const { setActiveUser, login } = loginSlice.actions;

export const companySlice = createSlice({
    name: "company",
    initialState: {
        isLoading: true,
    },
    reducers: {
        initialPushCompany(state, { payload }) {
            return { ...state, }
        },
        addCompany(state, { payload }) {
            state.companies.push(payload)
        },
        addCompanyState(state, { payload }) {
            return console.log("adicionou nova empresa")
        },
        setCompany(state, { payload }) {
            return { ...state, companies: payload, isLoading: false }
        },
        editCompany(state, { payload }) {
            console.log(payload)
            console.log(findIndex(propEq('id', payload.id))(state.companies))
            state.companies[findIndex(propEq('id', payload.id))(state.companies)] = payload
        }
    }
})

export const { initialPushCompany, addCompany, setCompany, addCompanyState, editCompany } = companySlice.actions;



export const departamentoSlice = createSlice({
    name: "departamento",
    initialState: {
        isLoading: true,
    },
    reducers: {
        initialPushDepartamento(state, { payload }) {
            return { ...state, }
        },
        addDepartamento(state, { payload }) {
            state.departamento.push(payload)
        },
        addDepartamentoState(state, { payload }) {
            return console.log("adicionou nova empresa")
        },
        setDepartamento(state, { payload }) {
            return { ...state, departamento: payload, isLoading: false }
        },
        editDepartamento(state, { payload }) {
            console.log(payload)
            console.log(findIndex(propEq('id', payload.id))(state.departamento))
            state.departamento[findIndex(propEq('id', payload.id))(state.departamento)] = payload
        }
    }
})

export const { initialPushDepartamento, addDepartamento, setDepartamento,
    addDepartamentoState, editDepartamento } = departamentoSlice.actions;


export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: true,
    },
    reducers: {
        initialPushUser(state, { payload }) {
            return { ...state, }
        },
        addUser(state, { payload }) {
            state.user.push(payload)
        },
        addUserState(state, { payload }) {
            return console.log("adicionou novo usuario")
        },
        setUser(state, { payload }) {
            return { ...state, user: payload, isLoading: false }
        },
        editUser(state, { payload }) {
            console.log(payload)
            console.log(findIndex(propEq('id', payload.id))(state.user))
            state.user[findIndex(propEq('id', payload.id))(state.user)] = payload
        }
    }
})

export const { initialPushUser, addUser, setUser,
    addUserState, editUser } = userSlice.actions;



export const questaoSlice = createSlice({
    name: "questao",
    initialState: {
        isLoading: true,
        questionario: {
            questionarioDados: {},
            questoes: [{
                descricao: '',
                tipo: '',
                id: ''
            }],
        },
        respostas: {

        }
    },
    reducers: {
        initialPushQuestao(state, { payload }) {
            return { ...state }
        },
        setListaQuestionario(state, { payload }) {
            state.questionario.questionarioDados = payload
            state.isLoading = false
        },

        setQuestaoDetails(state, { payload }) {
            state.questionario.questoes = payload
        },
        saveQuestao(state, { payload }) {
            return { ...state }
        },
        saveRespostas(state, { payload }) {
            return { ...state }
        },
        getRespostasState(state, { payload }) {
            return { ...state }
        },
        setRespostasState(state, { payload }) {
            state.respostas = {...payload}
        }
    }
})

export const { initialPushQuestao, setListaQuestionario, setQuestaoDetails, saveQuestao, saveRespostas, getRespostasState, setRespostasState } = questaoSlice.actions


const reducer = combineReducers({
    login: loginSlice.reducer,
    company: companySlice.reducer,
    departamento: departamentoSlice.reducer,
    user: userSlice.reducer,
    questao: questaoSlice.reducer,
})

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), sagaMiddleware],
})

export default reducer

sagaMiddleware.run(rootSaga)