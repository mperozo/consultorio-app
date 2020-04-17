import React from 'react'

import axios from 'axios'

class Home extends React.Component {

    state = {
        nome: ''
    }

    componentDidMount() {
        
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
                        href="#/cadastroUsuario"
                        role="button">
                        <i className="fa fa-users"></i>
                            Cadastrar Usuário
                    </a>
                    <a className="btn btn-danger btn-lg"
                        href="#/atendimentos"
                        role="button">
                        <i className="fa fa-users"></i>
                            Agendar Atendimento
                    </a>
                </p>
            </div>
        )
    }
}
export default Home