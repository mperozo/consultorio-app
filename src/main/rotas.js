import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/usuario/cadastro-usuario'
import CadastroPaciente from '../views/paciente/cadastro-paciente'
import ConsultaAtendimento from '../views/atendimento/consulta-atendimentos'
import CadastroAtendimento from '../views/atendimento/cadastro-atendimentos'
import { Route, Switch, HashRouter } from 'react-router-dom'

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
                <Route path="/cadastro-paciente" component={CadastroPaciente} />
                <Route path="/consulta-atendimentos" component={ConsultaAtendimento} />
                <Route path="/cadastro-atendimentos/:id?" component={CadastroAtendimento} />
            </Switch>
        </HashRouter>
    )
}
export default Rotas