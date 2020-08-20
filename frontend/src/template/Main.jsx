import React  from 'react'
import Login from './Login'
import { Provider as ReduxProvider, useSelector } from 'react-redux'
import { store } from '../store/main'
import Welcome from './Welcome'
import { BrowserRouter, Route, useLocation, Switch, Redirect } from 'react-router-dom'

export default function Main(props) {

    

    return (
        <div>
            <BrowserRouter>
                <ReduxProvider store={store}>
                    <Switch>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <ProtectedRoute  path="/">
                            <Welcome />
                        </ProtectedRoute>
                        <ProtectedRoute path="*">
                            <Redirect to={{ pathname: '/' }} />
                        </ProtectedRoute>
                    </Switch>
                </ReduxProvider>
            </BrowserRouter>
        </div>
    )
}

function ProtectedRoute({ path, children }) {
    const isLoggedIn = useSelector(state => state.login.tipo != 0);
    const location = useLocation();

    if (!isLoggedIn) return <Redirect to={{ pathname: '/login', state: { from: location } }} />;

    return (
        <Route path={path}>
            {children}
        </Route>
    );
}
