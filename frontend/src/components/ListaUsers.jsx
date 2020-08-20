import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { initialPushDepartamento, editDepartamento, initialPushUser } from '../store/main'
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
import EditUser from './EditUser'

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

        dispatch(initialPushUser());
    }, [])
    const isLoading = useSelector(state => state.user.isLoading)
    const users = useSelector(state => state.user.user)
    const upaAPrimeira = texto => texto[0].toUpperCase() + texto.slice(1)



    function novoUser() {
        setIsOpen(!isOpen)
        setSelect(null)
    }

    const columns = users
        ? Object.keys(users[0]).map(key => ({
            title: upaAPrimeira(key),
            field: key,
            hidden: key === 'id' ? true : false
        })) : ''

    let data = clone(users)
    function handleClick(props) {

        setIsOpen(!isOpen)
        setSelect(props)
    }


    return (
        <Paper className={classes.root}>
            <div className={classes.title}>
                <EditUser isOpen={isOpen} user={select} onClick={setIsOpen} />
                <Typography variant="h5"> Usuarios </Typography>
                <Button variant="contained" color="primary" onClick={novoUser}>Novo</Button>
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
                            {data.map(user => (
                                <TableRow key={user.id} onClick={(event) => handleClick(user)}>
                                    {Object.keys(user).map(chave => (
                                        <TableCell>{user[chave]}</TableCell>
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