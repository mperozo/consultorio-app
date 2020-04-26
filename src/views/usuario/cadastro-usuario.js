import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import {withRouter} from 'react-router-dom'
import {mensagemSucesso, mensagemErro} from '../../components/toastr'

import UsuarioService from '../../app/service/usuarioService'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        tipoUsuario:'MEDICO',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    validar = () => {
        const msgs = []

        if(!this.state.nome) {
            msgs.push('Nome é obrigatório.')
        }

        if(!this.state.email) {
            msgs.push('E-mail é obrigatório.')
        }else if ( !this.state.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/) ) {
            msgs.push('Email inválido')
        }

        if(!this.state.senha || !this.state.senhaRepeticao) {
            msgs.push('Senha é obrigatória.')
        } else if (this.state.senha !== this.state.senhaRepeticao) {
            msgs.push('As senhas devem ser iguais.')
        }

        if(!this.state.tipoUsuario) {
            msgs.push('Tipo de usuário é obrigatório.')
        }

        return msgs;
    }

    cadastrar = () => {

        //TODO colocar o campo na tela
        this.setState({tipoUsuario : 'MEDICO'});

        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index) => {
                mensagemErro(msg);
            });
            return false;
        }

        const usuario = {
            nome: this.state.nome,
            email: this.state.email,
            senha: this.state.senha,
            tipoUsuario: this.state.tipoUsuario
        }

        this.service.salvar(usuario)
            .then( response => {
                mensagemSucesso("Usuário cadastrado com sucesso!")
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
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
                            <FormGroup label="Tipo: *" htmlFor="inputTipo">
                                <div className="form-check">
                                    <div className="custom-control custom-radio">
                                        <input type="radio" 
                                            id="customRadio1"
                                            className="custom-control-input"
                                            name="tipoUsuario"
                                            value="MEDICO"
                                            defaultChecked
                                            checked={this.state.tipoUsuario === "MEDICO"}
                                            onChange={ e => this.setState({tipoUsuario: e.target.value}) }/>
                                        <label className="custom-control-label" for="customRadio1">Médico</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input type="radio" 
                                            id="customRadio2"
                                            className="custom-control-input"
                                            name="tipoUsuario"
                                            value="SECRETARIA"
                                            checked={this.state.tipoUsuario === "SECRETARIA"}
                                            onChange={ e => this.setState({tipoUsuario: e.target.value}) }/>
                                        <label className="custom-control-label" for="customRadio2">Secretária</label>
                                    </div>
                                </div>
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
                            <button onClick={this.cancelar} type="button" className="btn btn-secondary">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter ( CadastroUsuario )