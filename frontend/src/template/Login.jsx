import React, { useState } from 'react'
import { Button, Paper, TextField, InputLabel, InputAdornment, Box, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Logo from '../assets/logo-bitwise.png'
import { AccountCircle, Visibility, VisibilityOff, VpnKeyRounded } from '@material-ui/icons'
import { login } from '../store/main'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles(props => ({
    root: {
        display: 'flex',
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0px',
        background: '#efefef'
    },
    container: {
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'column',
        width: '350px',
        height: '500px',
        background: '#FFF',
        padding: "10px 0px",
    },
    logo: {
        height: '128px',
        width: '250px',
        alignSelf: 'center',

    },
    inputscontainer: {
        width: "80%",
        alignSelf: 'center',
        padding: '20px',
    },
    inputs: {
        width: "100%",
        paddingBottom: '15px',
    },
    Button: {
        width: '60px',
        alignSelf: 'center',
    }

    // cor principal : #1d70b7
}))

export default function Login(props) {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [validLogin, setValidLogin] = useState(true)
    const dispatch = useDispatch();

    const handleEmail = e => { setEmail(e.target.value) }
    const handleSenha = e => { setSenha(e.target.value) }
    const handleMouseDownPassword = event => { event.preventDefault() }
    const handleClickShow = e => { setShowPassword(!showPassword) }
    const handleLogin = e => {
        dispatch(login({ email: email, senha }))
    }
    const isLoged = useSelector(state => state.login.tipo != 0);
    if(isLoged) return <Redirect to={{ pathname: '/' }} />

    return (
        <div className={classes.root}>
            
            <Paper className={classes.container} >
                <img src={Logo} className={classes.logo} />
                <Box className={classes.inputscontainer}>

                    <TextField label="E-mail"
                        value={email}
                        onChange={handleEmail}
                        variant="outlined"
                        className={classes.inputs}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            )
                        }} />
                    <TextField label="Senha"
                        value={senha}
                        onChange={handleSenha}
                        variant="outlined"
                        className={classes.inputs}
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <VpnKeyRounded />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShow}
                                        onMouseDown={handleMouseDownPassword}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            ),

                        }} />

                </Box>
                <Button
                    variant="contained"
                    className={classes.Button}
                    color={validLogin ? "primary" : "secondary"}
                    onClick={handleLogin}>
                    Login
                </Button>
            </Paper>
        </div>
    )
}