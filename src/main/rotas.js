import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/usuario/cadastro-usuario'
import ConsultaAtendimento from '../views/atendimento/consulta-atendimentos'
import { Route, Switch, HashRouter } from 'react-router-dom'

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
                <Route path="/consulta-atendimentos" component={ConsultaAtendimento} />
            </Switch>
        </HashRouter>
    )
}
export default Rotas