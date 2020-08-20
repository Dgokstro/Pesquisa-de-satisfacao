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
import { editCompany, addCompanyState } from '../store/main'


export default function EditEmpresa(props) {

    const dispatch = useDispatch()

    const [nome, setNome] = useState()
    const [endereco, setEndereco] = useState()
    const [CNPJ, setCNPJ] = useState()
    const [cidade, setCidade] = useState()
    const [UF, setUF] = useState()
    const [telefone, setTelefone] = useState()
    const [email, setEmail] = useState()


    useEffect(() => setNome(props.company?.nome ?? ''), [props])
    useEffect(() => setEndereco(props.company?.endereco ?? ''), [props])
    useEffect(() => setCNPJ(props.company?.CNPJ ?? ''), [props])
    useEffect(() => setCidade(props.company?.cidade ?? ''), [props])
    useEffect(() => setUF(props.company?.uf ?? ''), [props])
    useEffect(() => setTelefone(props.company?.telefone ?? ''), [props])
    useEffect(() => setEmail(props.company?.email ?? ''), [props])


    const company = {
        nome: nome,
        endereco: endereco,
        CNPJ: CNPJ,
        cidade: cidade,
        uf: UF,
        telefone: telefone,
        email: email,
        id: props.company?.id ?? null,
    }

    function handleClick() {
        company.id
            ? dispatch(editCompany(company))
            : dispatch(addCompanyState(company)),
            props.onClick(false)
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
                            value={nome}
                            onChange={(event) => setNome(event.target.value)}
                            label="Nome"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            value={endereco}
                            onChange={(event) => setEndereco(event.target.value)}
                            label="Endereco"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            value={CNPJ}
                            onChange={(event) => setCNPJ(event.target.value)}
                            label="CNPJ"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            fullWidth
                            value={UF}
                            onChange={(event) => setUF(event.target.value)}
                            label="UF"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            value={cidade}
                            onChange={(event) => setCidade(event.target.value)}
                            label="Cidade"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            fullWidth
                            value={telefone}
                            onChange={(event) => setTelefone(event.target.value)}
                            label="Telefone"
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
