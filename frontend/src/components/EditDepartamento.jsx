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
import { editDepartamento, addDepartamentoState } from '../store/main'


export default function EditEmpresa(props) {

    const dispatch = useDispatch()

    const [descricao, setDescricao] = useState()
    const [empresa, setEmpresa] = useState()



    useEffect(() => setDescricao(props.company?.descricao ?? ''), [props])
    useEffect(() => setEmpresa(props.company?.empresa ?? ''), [props])

    const departamento = {
        descricao: descricao,
        empresa: empresa,
        id: props.company?.id ?? null,
    }

    function handleClick() {
        departamento.id
            ? dispatch(editDepartamento(departamento))
            : dispatch(addDepartamentoState(departamento)),
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
                            value={descricao}
                            onChange={(event) => setDescricao(event.target.value)}
                            label="Descricao"
                            variant="outlined" />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            value={empresa}
                            onChange={(event) => setEmpresa(event.target.value)}
                            label="Empresa"
                            variant="outlined"
                            disabled={props.company?.empresa} />
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
