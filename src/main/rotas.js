import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/usuario/cadastro-usuario'
import CadastroPaciente from '../views/paciente/cadastro-paciente'
import ConsultaAtendimento from '../views/atendimento/consulta-atendimentos'
import CadastroAtendimento from '../views/atendimento/cadastro-atendimentos'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

const isUsuarioAutenticado = () => {
    return true;
}

//Utilizando o destructor para obter o componente e também todas as propriedades passadas
function RotaAutenticada( {component: Component, ...props}) {
    return (
        //Obtendo as propriedades passadas para o método e o componentProps (era pra ser props, mas já está sendo usado) passado (ex: Home)
        <Route {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado()) {
                return (
                    // Se estiver autenticado, vai ter todas as propriedades passadas na Rota
                    <Component {... componentProps} />
                )
            } else {
                return (
                    <Redirect to={ {pathname: '/login', state : {from: componentProps.location} } }/>
                )
            }
        }} />
    )
}

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />

                <RotaAutenticada path="/home" component={Home} />
                <RotaAutenticada path="/cadastro-paciente" component={CadastroPaciente} />
                <RotaAutenticada path="/consulta-atendimentos" component={ConsultaAtendimento} />
                <RotaAutenticada path="/cadastro-atendimentos/:id?" component={CadastroAtendimento} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas