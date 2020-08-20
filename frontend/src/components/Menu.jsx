import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const useSyles = makeStyles(props => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    menuItem: {
        display: 'flex',
        flexDirection: 'row',
    },
    nome: {
        margin: '0px 15px',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'black',
    }
}))

export default function Menu() {
    const tipo = useSelector(state => state.login.tipo)
    const classes = useSyles()
    return (
        <div className={classes.root}>
            <div>
                <Typography variant='body2' className={classes.nome}
                    component={Link} to='/empresa' >
                    Empresa
                </Typography>
            </div>
            <div>
                <Typography variant='body2' className={classes.nome}
                    component={Link} to='/departamento'>
                    Departamento
                </Typography>
            </div>
            <div>
                <Typography variant='body2' className={classes.nome}
                    component={Link} to='/usuarios'>
                    Usuarios
                </Typography>
            </div>
            <div>
                <Typography variant='body2' className={classes.nome}
                    component={Link} to='/questionario'>
                    Questionario
                </Typography>
            </div>
            <div>
                <Typography variant='body2' className={classes.nome}
                    component={Link} to='/responder'>
                    Responder
                </Typography>
            </div>
            <div>
                <Typography variant='body2' className={classes.nome}
                    component={Link} to='/dashboard'>
                    Dashboard
                </Typography>
            </div>
        </div>
    )
}