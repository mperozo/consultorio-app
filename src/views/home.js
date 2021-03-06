import React from 'react'

import { AuthContext } from '../main/provedorAutenticacao'

class Home extends React.Component {

    state = {
        nome: ''
    }

    componentDidMount() {
        const usuarioLogado = this.context.usuarioAutenticado
        this.setState({nome: usuarioLogado.nome})
    }

    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem-vindo!</h1>
                <p className="lead">Nome: {this.state.nome}</p>
                <hr className="my-4"></hr>
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg"
                        href="#/cadastro-usuario"
                        role="button">
                        <i className="pi pi-users"></i> Cadastrar Usuário
                    </a>
                    <a className="btn btn-primary btn-lg"
                        href="#/cadastro-atendimentos"
                        role="button">
                        <i className="pi pi-briefcase"></i> Cadastrar Atendimento
                    </a>
                </p>
            </div>
        )
    }
}

Home.contextType = AuthContext

export default Home