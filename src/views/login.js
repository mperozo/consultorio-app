import React from 'react'
import Card from '../components/card'
import FormGroup from '../components/form-group'

import { withRouter } from 'react-router-dom'
import axios from 'axios'


class Login extends React.Component {

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }

    entrar = () => {
        axios
            .post('http://localhost:8080/api/usuario/autenticar', {
                email: this.state.email,
                senha: this.state.senha
            }).then( response => {
                console.log(response)
                this.props.history.push('/home')
            }).catch( erro => {
                console.log(erro.response.data)
                this.setState({mensagemErro: erro.response.data})
            });
    }

    prepararCadastrar = () => {
        this.props.history.push('/cadastroUsuario')
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6" style={ {position: 'relative', left: '300px'} }>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row"> 
                                <span>{this.state.mensagemErro}</span>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <fieldset>
                                        <FormGroup label="E-mail: *" htmlFor="exampleInputEmail1">
                                            <input type="email" 
                                                    value={this.state.email}
                                                    onChange={e => this.setState({email: e.target.value})}
                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email" />
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                                            <input type="password" 
                                                    value={this.state.senha}
                                                    onChange={e => this.setState({senha: e.target.value})}
                                                    className="form-control" 
                                                    id="exampleInputPassword1" 
                                                    placeholder="Password"/>
                                        </FormGroup>
                                        <button  className="btn btn-primary" onClick={this.entrar} >Entrar</button>
                                        <button  className="btn btn-secondary" onClick={this.prepararCadastrar} >Cadastrar</button>
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
export default withRouter ( Login )