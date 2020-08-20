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
    Divider,
    Slider
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Add } from "@material-ui/icons"
import { useDispatch, useSelector } from 'react-redux'
import { initialPushQuestao, setQuestaoDetails, saveRespostas } from '../store/main'
import { clone } from 'ramda'


export default function GravaRespostas(props) {

    const dispatch = useDispatch()
    const [descricao, setDescricao] = useState()
    const [id, setId] = useState()
    const user = useSelector((state => state.login.id))
    const [questoes, setQuestoes] = useState([{
        id: '',
        descricao: '',
        value: '',
        tipo: '',
    }])
    const questoesState = useSelector((state => state.questao.questionario.questoes))



    useEffect(() => setDescricao(props.questionario?.descricao ?? ''), [props])
    useEffect(() => setId(props.questionario?.id ?? ''), [props])
    useEffect(() => {
        dispatch(setQuestaoDetails([{
            id: '',
            descricao: '',
            value: '',
            tipo: '',
        }])),
            props.questionario?.id
                ? dispatch(initialPushQuestao({ id: props.questionario.id }))
                : ''
    }, [props.questionario?.id])


    const questoesValues = questoesState.map(questao => ({
        id: questao.id ?? '',
        descricao: questao.descricao ?? '',
        value: null,
        tipo: questao.tipo ?? ''
    }))

    useEffect(() => setQuestoes(questoesValues), [questoesState])


    const questionario = {
        descricao: descricao,
        id: props.questionario?.id ?? undefined,
    }


    function handleClick() {
        const newQuestionario = { questionarioDados: questionario, questoes: questoes, user: user }
        console.log(newQuestionario)
         dispatch(saveRespostas(newQuestionario))
        props.onClick(false)
    }

    const handleChangeDescricao = (questao, indice) => e => {
        const descricao = e.target.value
        let newQuestoes = clone(questoes)
        newQuestoes[indice] = { ...questao, descricao: descricao }
        setQuestoes(newQuestoes)
    }
    const handleChangeValue = (questao, indice) => (e, newValue) => {
        const value = newValue ?? e.target.value
        console.log(value)
        let newQuestoes = clone(questoes)
        newQuestoes[indice] = { ...questao, value: value }
        setQuestoes(newQuestoes)
    }


    return (
        <Dialog
            fullWidth
            maxWidth={'sm'}
            open={props.isOpen}>
            <DialogTitle> Questionario </DialogTitle>
            <DialogContent >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6" > {descricao} </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            questoes.map((questao, indice) => (
                                < Grid container spacing={2} >


                                    <Grid item xs={12}>
                                        <Typography variant="body1" > {questao.descricao} </Typography>
                                    </Grid>
                                    <Grid item xs={12}>

                                        {questao.tipo === 1 ?
                                            <TextField
                                                fullWidth
                                                value={questao.value}
                                                onChange={handleChangeValue(questao, indice)}
                                                label="Escreva sua Resposta"
                                                variant="outlined" />
                                            :
                                            <Slider value={questao.value}
                                                onChange={handleChangeValue(questao, indice)}
                                                valueLabelDisplay="auto"
                                                step={1}
                                                marks min={0}
                                                max={10} />
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
        </Dialog >
    )
}
