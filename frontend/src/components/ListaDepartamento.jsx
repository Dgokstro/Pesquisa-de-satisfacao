import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { initialPushDepartamento, editDepartamento } from '../store/main'
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
import EditDepartamento from './EditDepartamento'

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



export default function ListaDepartamento() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [select, setSelect] = useState(null)
    useEffect(() => {

        dispatch(initialPushDepartamento());
    }, [])
    const isLoading = useSelector(state => state.departamento.isLoading)
    const departamento = useSelector(state => state.departamento.departamento)
    const upaAPrimeira = texto => texto[0].toUpperCase() + texto.slice(1)



    function novoDepartamento() {
        setIsOpen(!isOpen)
        setSelect(null)
    }

    const columns = departamento
        ? Object.keys(departamento[0]).map(key => ({
            title: upaAPrimeira(key),
            field: key,
            hidden: key === 'id' ? true : false
        })) : ''

    let data = clone(departamento)
    function handleClick(props) {

        setIsOpen(!isOpen)
        setSelect(props)
    }


    return (
        <Paper className={classes.root}>
            <div className={classes.title}>
                <EditDepartamento isOpen={isOpen} company={select} onClick={setIsOpen} />
                <Typography variant="h5"> Departamento </Typography>
                <Button variant="contained" color="primary" onClick={novoDepartamento}>Novo</Button>
            </div>
            {isLoading
                ? <CircularProgress className={classes.loading} />
                : <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow key={"TH"}>
                                {columns.map(coluna => <TableCell key={coluna.title}>{coluna.title}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map(departamento => (
                                <TableRow key={departamento.id} onClick={(event) => handleClick(departamento)}>
                                    {Object.keys(departamento).map(chave => (
                                        <TableCell>{departamento[chave]}</TableCell>
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