import React, { useState, useEffect } from 'react'
import {
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    OutlinedInput,
    Button,
    TextField,
    Grid,
    Card,
    Divider
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Add } from "@material-ui/icons"
import { useDispatch, useSelector } from 'react-redux'
import { initialPushQuestao, setQuestaoDetails, saveQuestao } from '../store/main'
import { clone } from 'ramda'


export default function EditQuestionario(props) {

    const dispatch = useDispatch()

    const [usuario, setUsuario] = useState()
    const [descricao, setDescricao] = useState()
    const [status, setStatus] = useState()
    const [usuarioSolicitante, setUsuarioSolicitante] = useState()
    const [sigilo, setSigilo] = useState()
    const [departamento, setDepartamento] = useState()
    const [questoes, setQuestoes] = useState([{
        descricao: '',
        tipo: ''
    }])
    const questoesState = useSelector((state => state.questao.questionario.questoes))

    useEffect(() => setUsuario(props.questionario?.usuario ?? ''), [props])
    useEffect(() => setDescricao(props.questionario?.descricao ?? ''), [props])
    useEffect(() => setStatus(props.questionario?.status ?? ''), [props])
    useEffect(() => setUsuarioSolicitante(props.questionario?.usuarioSolicitante ?? ''), [props])
    useEffect(() => setSigilo(props.questionario?.sigilo ?? ''), [props])
    useEffect(() => setDepartamento(props.questionario?.departamento ?? ''), [props])
    useEffect(() => {
        dispatch(setQuestaoDetails([{
            descricao: '',
            tipo: ''
        }])),
            props.questionario?.id
                ?
                dispatch(initialPushQuestao({ id: props.questionario.id })) : ''
    }, [props.questionario?.id])
    console.log("questoes State", questoesState)
    useEffect(() => setQuestoes(questoesState), [questoesState])


    const questionario = {
        usuario: usuario,
        descricao: descricao,
        status: status,
        usuarioSolicitante: usuarioSolicitante,
        sigilo: sigilo,
        departamento: departamento,
        id: props.questionario?.id ?? undefined,
    }


    function handleClick() {
        const newQuestionario = { questionarioDados: questionario, questoes: questoes }
        console.log(newQuestionario)
        dispatch(saveQuestao(newQuestionario))
        props.onClick(false)
    }

    const handleChangeDescricao = (questao, indice) => e => {
        const descricao = e.target.value
        let newQuestoes = clone(questoes)
        newQuestoes[indice] = { ...questao, descricao: descricao }
        setQuestoes(newQuestoes)
    }
    const handleChangeTipo = (questao, indice) => e => {
        const tipo = e.target.value
        let newQuestoes = clone(questoes)
        newQuestoes[indice] = { ...questao, tipo: tipo }
        setQuestoes(newQuestoes)
    }


    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open={props.isOpen}>
            <DialogTitle> Teste </DialogTitle>
            <DialogContent >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            value={usuario}
                            onChange={(event) => setUsuario(event.target.value)}
                            label="Usuario"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            value={descricao}
                            onChange={(event) => setDescricao(event.target.value)}
                            label="Descricao"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                            label="status"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            value={sigilo}
                            onChange={(event) => setSigilo(event.target.value)}
                            label="Sigilo"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            value={usuarioSolicitante}
                            onChange={(event) => setUsuarioSolicitante(event.target.value)}
                            label="Usuario Solicitante"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            fullWidth
                            value={departamento}
                            onChange={(event) => setDepartamento(event.target.value)}
                            label="Departamento"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>


                        {
                            questoes.map((questao, indice) => (

                                <Grid container spacing={2}>


                                    <Grid item xs={8}>
                                        <TextField
                                            fullWidth
                                            value={questao.descricao}
                                            onChange={handleChangeDescricao(questao, indice)}
                                            label="Descrição"
                                            variant="outlined" />
                                    </Grid>
                                    <Grid item xs={2}>

                                        <TextField
                                            fullWidth
                                            value={questao.tipo}
                                            onChange={handleChangeTipo(questao, indice)}
                                            label="Tipo"
                                            variant="outlined" />
                                    </Grid>
                                    <Grid item xs={2}>
                                        {
                                            indice === questoes.length - 1
                                                ? <Button onClick={(event) => setQuestoes(questoes.concat({ descricao: '', tipo: '' }))}>
                                                    <Add />
                                                </Button>
                                                : ''
                                        }

                                    </Grid>
                                </Grid>






                            ))
                        }
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClick} variant='contained' color="primary">
                    Salvar
                </Button>
                <Button onClick={() => props.onClick(false)} variant='contained' color="secondary">
                    Fechar
                </Button>
            </DialogActions>
        </Dialog>
    )
}
