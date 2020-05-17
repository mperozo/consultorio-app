import React from 'react'

import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/usuario/cadastro-usuario'
import CadastroPaciente from '../views/paciente/cadastro-paciente'
import ConsultaAtendimento from '../views/atendimento/consulta-atendimentos'
import CadastroAtendimento from '../views/atendimento/cadastro-atendimentos'

import { AuthConsumer } from '../main/provedorAutenticacao'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

//TIP: Utilizando o destructor para obter o componente e também todas as propriedades passadas
function RotaAutenticada( {component: Component, isUsuarioAutenticado, ...props}) {
    return (
        //TIP: Obtendo as propriedades passadas para o método e o componentProps (era pra ser props, mas já está sendo usado) passado (ex: Home)
        <Route {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado) {
                return (
                    //TIP: Se estiver autenticado, vai ter todas as propriedades passadas na Rota
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

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-paciente" component={CadastroPaciente} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consulta-atendimentos" component={ConsultaAtendimento} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastro-atendimentos/:id?" component={CadastroAtendimento} />
            </Switch>
        </HashRouter>
    )
}

//TIP: seria export default Rotas, mas para obter a autenticação em um componente de função é necessário fazer dessa forma
export default () => (
    <AuthConsumer>
        { (context) => (
            <Rotas isUsuarioAutenticado={context.isAutenticado} />
        )}
    </AuthConsumer>
)