import React from 'react'

import LocalStorageService from '../app/service/localstorageService'

class Home extends React.Component {

    state = {
        nome: ''
    }

    componentDidMount() {
        const usuarioLogado = LocalStorageService.getItem('_usuario_logado')
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
                        <i className="fa fa-users"></i>
                            Cadastrar Usuário
                    </a>
                    <a className="btn btn-primary btn-lg"
                        href="#/cadastro-atendimentos"
                        role="button">
                        <i className="fa fa-users"></i>
                            Cadastrar Atendimento
                    </a>
                </p>
            </div>
        )
    }
}
export default Home