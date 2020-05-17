import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'

import UsuarioService from '../app/service/usuarioService'

import { mensagemErro } from '../components/toastr'
//TIP: Como o AuthContext não está no export default, é necessário declará-lo assim no import
import { AuthContext } from '../main/provedorAutenticacao'

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        }).catch(erro => {
            mensagemErro(erro.response.data)
        });
    }

    prepararCadastrar = () => {
        this.props.history.push('/cadastro-usuario')
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={{ position: 'relative', left: '300px' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <fieldset>
                                        <FormGroup label="E-mail" htmlFor="exampleInputEmail1">
                                            <input type="email"
                                                value={this.state.email}
                                                onChange={e => this.setState({ email: e.target.value })}
                                                className="form-control"
                                                id="exampleInputEmail1"
                                                aria-describedby="emailHelp"
                                                placeholder="Digite o Email" />
                                        </FormGroup>
                                        <FormGroup label="Senha" htmlFor="exampleInputPassword1">
                                            <input type="password"
                                                value={this.state.senha}
                                                onChange={e => this.setState({ senha: e.target.value })}
                                                className="form-control"
                                                id="exampleInputPassword1"
                                                placeholder="Password" />
                                        </FormGroup>
                                        <button className="btn btn-primary"
                                            onClick={this.entrar}>
                                            <i className="pi pi-sign-in"></i> Entrar
                                        </button>
                                        <button className="btn btn-secondary"
                                            onClick={this.prepararCadastrar}>
                                            <i className="pi pi-plus"></i> Cadastrar
                                        </button>
                                    </fieldset>
                                </div>
                            </div>

                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

//TIP: componente de class tem contextType. Ele receber o AuthContext é igual a ele fazer um subscribe e pode usar os métodos de AuthContext
Login.contextType = AuthContext

export default withRouter(Login)