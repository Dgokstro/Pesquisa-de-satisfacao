import React, { useEffect } from 'react'
import { getRespostasState, initialPushQuestao } from '../store/main'
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, CircularProgress, Slider, Paper, Typography, Divider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { ExpandMore } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'

const useStyles = makeStyles(props => ({

    root: {
        width: '88%',
        height: '77vh',
        margin: '3% 6%',
        overflow: 'auto',
    },
    header: {
        '& .MuiExpansionPanelSummary-content': {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline'
        }
    },
    questionarioHeader: {
        display: 'flex',
        alignItems: 'baseline',

    },
    details: {
        width: '100%',
    },
    respostas: {
        display: 'flex',
        alignItems: 'baseline',
    },
    respostasHeader: {
        display: 'block'
    }

}))

export default function ListaRespostas(props) {
    const dispatch = useDispatch()
    const classes = useStyles()

    useEffect(() => { dispatch(initialPushQuestao()) }, [])

    const [expanded, setExpanded] = useState(false)
    const [expandedIten, setExpandediten] = useState(false)
    const respostas = useSelector(state => state.questao.respostas)
    const questoes = useSelector(state => state.questao.questionario.questionarioDados)


    const handleChangeHeader = (panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
        dispatch(getRespostasState(panel))
    })
    const handleChangeItem = (panel => (event, isExpanded) => {
        setExpandediten(isExpanded ? panel : false)

    })
    function valuetext(value) {
        return `${value - 10} xxx`;
    }

    console.log("respostas: ", respostas)
    console.log("questoes: ", questoes)
    return (

        questoes?.length ?
            <Paper className={classes.root}>
                {questoes.map(questao => (

                    <ExpansionPanel expanded={expanded === questao.id} onChange={handleChangeHeader(questao.id)} >
                        <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls={questao.id} id={questao.id} className={classes.header}>
                            <span className={classes.questionarioHeader}>
                                <Typography variant="h6">Questionario: &nbsp;</Typography>
                                <Typography variant="body1"> {questao.descricao}</Typography>
                            </span>
                            <span className={classes.questionarioHeader}>
                                <Typography variant="body1">Respondidos: &nbsp; </Typography>
                                <Typography variant='body2'>{questao.respondidos}</Typography>
                            </span>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <div className={classes.details}>
                                {respostas?.tipo2?.message
                                    ? ''
                                    : respostas.tipo2
                                        ? Object.keys(respostas.tipo2).map(questao => (
                                            respostas.tipo2[questao].map(teste => (
                                                <div>
                                                    <div className={classes.questionarioHeader}>
                                                        <Typography variant="h6">Questão: &nbsp;</Typography>
                                                        <Typography variant="body1">{teste.descricaoItem} </Typography>
                                                    </div>
                                                    <Slider defaultValue={teste.media}
                                                        value={teste.media}
                                                        valueLabelDisplay="on"
                                                        max={10}
                                                        min={0}
                                                        onChange={() => teste.media}
                                                        marks={[{ value: 0, label: '0' }, { value: 10, label: '10' }]} />
                                                </div>
                                            ))
                                        ))
                                        : ''
                                }
                                {respostas?.tipo1 === "não tem questao do tipo 1"
                                    ? ''
                                    : respostas.tipo1
                                        ? Object.keys(respostas.tipo1).map(questao => (
                                            Object.keys(respostas.tipo1[questao]).map(item => (
                                                <div>

                                                    <ExpansionPanel expanded={expandedIten === item} onChange={handleChangeItem(item)}>
                                                        <ExpansionPanelSummary expandIcon={<ExpandMore />} aria-controls={questao.id} id={questao.id} className={classes.header}>
                                                            <span className={classes.questionarioHeader}>
                                                                <Typography variant="h6">Questão: &nbsp;</Typography>
                                                                <Typography variant="body1"> {respostas.tipo1[questao][item].descricao}</Typography>
                                                            </span>
                                                            <span className={classes.questionarioHeader}>
                                                                <Typography variant="body1">Respostas: &nbsp; </Typography>
                                                                <Typography variant='body2'>{respostas.tipo1[questao][item].value.length}</Typography>
                                                            </span>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails className={classes.respostasHeader}>

                                                            {respostas.tipo1[questao][item].value.map((valores, indice) => (
                                                                <div>
                                                                    <span className={classes.respostas}>
                                                                        <Typography variant='subtitle1'>Resposta: &nbsp; </Typography>
                                                                        <Typography variant="body2">{valores}</Typography>
                                                                    </span>
                                                                    <Divider />
                                                                </div>
                                                            ))}
                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>
                                                </div>
                                            ))
                                        ))
                                        : ''
                                }
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ))
                }
            </Paper >
            : <CircularProgress />
    )
}