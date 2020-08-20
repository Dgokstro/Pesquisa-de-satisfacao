import React from 'react'
import Logo from '../assets/logo-bitwise.png'
import { Paper, Typography, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles";
import { ExitToApp, Person } from '@material-ui/icons'
import { useSelector } from 'react-redux';
import Menu from '../components/Menu'
import ListaEmpresa from '../components/ListaEmpresa';
import ListaDepartamento from '../components/ListaDepartamento'
import ListaUsers from '../components/ListaUsers'
import ListaQuestionario from '../components/ListaQuestionario'
import { BrowserRouter, Route, useLocation, Switch, Redirect } from 'react-router-dom'
import ListaRespostas from '../components/ListaRespostas';

const useStyles = makeStyles(props => ({
    root: {
        display: 'flex',
        flexDirection: 'column',

    },
    topBar: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#efefef',
    },
    logo: {
        width: '100px',
        alignSelf: 'left',
        margin: '2px 10px'
    },
    menu: {
        margin: '2px 10px',
    },
    menuIten: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    nome: {
        marginRight: '15px',
    },
    Page: {
        width: '100%',
        height: '100%',
    }
}))

export default function Welcome() {
    const classes = useStyles();
    const nome = useSelector(state => state.login.nome);

    return (
        <div>
            <div className={classes.topBar}>
                <img src={Logo} className={classes.logo} />
                <Menu />
                <div className={classes.menu}>
                    <div className={classes.menuIten}>
                        <Person />
                        <Typography variant='body2' className={classes.nome}>
                            {nome}
                        </Typography>
                        <Button variant="contained" >
                            <ExitToApp className={classes.nome} />
                            <Typography variant='body2'>
                                Log out
                            </Typography>
                        </Button>
                    </div>
                </div>

            </div>
            <div className={classes.Page}>
                <Switch>
                    <Route path="/empresa">
                        <ListaEmpresa />
                    </Route>
                    <Route path="/departamento">
                        <ListaDepartamento />
                    </Route>
                    <Route path="/usuarios">
                        <ListaUsers />
                    </Route>
                    <Route path="/questionario">
                        <ListaQuestionario tipo="edit" />
                    </Route>
                    <Route path="/responder">
                        <ListaQuestionario tipo="resposta" />
                    </Route>
                    <Route path="/dashboard">
                        <ListaRespostas tipo="resposta" />
                    </Route>
                    <Route path="/">
                        <ListaEmpresa />
                    </Route>
                </Switch>
            </div>
        </div>
    )

}