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
    Grid
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useDispatch } from 'react-redux'
import { editUser, addUserState } from '../store/main'


export default function EditUser(props) {
    console.log("props do dialog: ", props)
    const dispatch = useDispatch()

    const [nome, setNome] = useState()
    const [email, setEmail] = useState()
    const [empresa, setEmpresa] = useState()
    const [status, setStatus] = useState()
    const [senha, setSenha] = useState()
    const [tipo, setTipo] = useState()
    const [departamento, setDepartamento] = useState()


    useEffect(() => setNome(props.user?.nome ?? ''), [props])
    useEffect(() => setEmpresa(props.user?.Empresa ?? ''), [props])
    useEffect(() => setStatus(props.user?.status ?? ''), [props])
    useEffect(() => setSenha(props.user?.senha ?? ''), [props])
    useEffect(() => setTipo(props.user?.tipo ?? ''), [props])
    useEffect(() => setDepartamento(props.user?.departamento ?? ''), [props])
    useEffect(() => setEmail(props.user?.email ?? ''), [props])


    const user = {
        nome: nome,
        empresa: empresa,
        status: status,
        senha: senha,
        tipo: tipo,
        departamento: departamento,
        email: email,
        id: props.user?.id ?? null,
    }

    function handleClick() {
        user.id
            ? dispatch(editUser(user))
            : dispatch(addUserState(user)),
            props.onClick(false)
    }

    return (
        <Dialog
            fullWidth
            maxWidth={'md'}
            open={props.isOpen}>
            <DialogTitle> User </DialogTitle>
            <DialogContent >
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            value={nome}
                            onChange={(event) => setNome(event.target.value)}
                            label="Nome"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            value={empresa}
                            onChange={(event) => setEmpresa(event.target.value)}
                            label="Empresa"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            value={status}
                            onChange={(event) => setStatus(event.target.value)}
                            label="Status"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            value={tipo}
                            onChange={(event) => setTipo(event.target.value)}
                            label="Tipo"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            value={senha}
                            onChange={(event) => setSenha(event.target.value)}
                            label="Senha"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            value={departamento}
                            onChange={(event) => setDepartamento(event.target.value)}
                            label="Departamento"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            fullWidth
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            label="E-mail"
                            variant="outlined" />
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
