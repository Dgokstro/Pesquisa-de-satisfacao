import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { initialPushQuestao } from '../store/main'
import {
    Typography,
    Paper,
    CircularProgress,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Table,
    TableBody,
    Button
} from '@material-ui/core'
import { clone } from 'ramda'
import EditQuestionario from './EditQuestionario'
import GravaRespostas from './GravaRespostas'

const useStyles = makeStyles(props => ({
    root: {
        width: '88%',
        height: '77vh',
        margin: '3% 6%',
        overflow: 'auto',
    },
    loading: {
        margin: '175px 525px',
    },
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: '10px'
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
    head: {
        display: 'flex',
        flexDirection: 'row',
    }
}))



export default function ListaEmpresa(propsLista) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [select, setSelect] = useState(null)

    const userId = useSelector(state => state.login.id)
    useEffect(() => {

        dispatch(initialPushQuestao({ user: propsLista.tipo === "resposta" ? userId : undefined }));
    }, [propsLista])
    const isLoading = useSelector(state => state.questao.isLoading)
    const questionarios = useSelector(state => { console.log('state que eu quero', state.questao.questionario.questionarioDados); return state.questao.questionario.questionarioDados })
    console.log('questionarios:', questionarios.length )
    const upaAPrimeira = texto => texto[0].toUpperCase() + texto.slice(1)



    function novoQuestionario() {
        setIsOpen(!isOpen)
        setSelect(null)
    }

    const columns = !questionarios.length > 0 ? null : questionarios
        ? Object.keys(questionarios[0]).map(key => ({
            title: upaAPrimeira(key),
            field: key,
            hidden: key === 'id' ? true : false
        })) : ''

    let data = clone(questionarios)
    function handleClick(props) {



        setIsOpen(!isOpen)
        setSelect(props)
        console.log(props)

    }


    return (
        <Paper className={classes.root}>
            <div className={classes.title}>
                {propsLista.tipo === "edit" &&
                    <EditQuestionario isOpen={isOpen} questionario={select} onClick={setIsOpen} />}
                {propsLista.tipo === "resposta" &&
                    <GravaRespostas isOpen={isOpen} questionario={select} onClick={setIsOpen} />}
                <Typography variant="h5"> Questionario </Typography>
                {propsLista.tipo === "edit" &&
                    <Button variant="contained" color="primary" onClick={novoQuestionario}>Nova</Button>}
            </div>
            {isLoading
                ? <CircularProgress className={classes.loading} />
                : !questionarios.length > 0 ? ''
                    : <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow key={"TH"}>
                                    {columns.map(coluna => <TableCell key={coluna.title}>{coluna.title}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map(questionario => (
                                    <TableRow key={questionario.id} onClick={(event) => handleClick(questionario)}>
                                        {Object.keys(questionario).map(chave => (
                                            <TableCell>{questionario[chave]}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
            }

        </Paper>


    )

}


