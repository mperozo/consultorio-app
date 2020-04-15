import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    cadastrar = () => {
        console.log(this.state);
    } 

    render() {
        return (
            <div className="container">
                <Card title="Cadastro de Usuário">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <FormGroup label="Nome: *" htmlFor="inputNome">
                                    <input type="text" 
                                            id="idInputNome" 
                                            className="form-control"
                                            name="nome"
                                            onChange={ e => this.setState({nome: e.target.value}) }/>
                                </FormGroup>
                                <FormGroup label="E-mail: *" htmlFor="inputEmail">
                                    <input type="email" 
                                            id="idInputEmail" 
                                            className="form-control"
                                            name="email"
                                            onChange={ e => this.setState({email: e.target.value}) }/>
                                </FormGroup>
                                <FormGroup label="Senha: *" htmlFor="inputSenha">
                                    <input type="password" 
                                            id="idInputSenha" 
                                            className="form-control"
                                            name="senha"
                                            onChange={ e => this.setState({senha: e.target.value}) }/>
                                </FormGroup>
                                <FormGroup label="Digite novamente a senha: *" htmlFor="inputSenhaRepeticao">
                                    <input type="password" 
                                            id="idInputSenhaRepeticao" 
                                            className="form-control"
                                            name="senhaRepeticao"
                                            onChange={ e => this.setState({senhaRepeticao: e.target.value}) }/>
                                </FormGroup>
                                <button onClick={this.cadastrar} type="button" className="btn btn-primary">Salvar</button>
                                <button type="button" className="btn btn-secondary">Cancelar</button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}
export default CadastroUsuario