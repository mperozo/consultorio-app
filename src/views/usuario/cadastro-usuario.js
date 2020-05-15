import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import RadioButton from '../../components/radiobutton'
import { withRouter } from 'react-router-dom'
import { mensagemSucesso, mensagemErro } from '../../components/toastr'

import UsuarioService from '../../app/service/usuarioService'

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        tipoUsuario: 'MEDICO',
        senhaRepeticao: ''
    }

    constructor() {
        super();
        this.service = new UsuarioService();
    }

    cadastrar = () => {

        const {nome, email, senha, senhaRepeticao, tipoUsuario} = this.state
        const usuario = {nome, email, senha, senhaRepeticao, tipoUsuario}
        
        try {
            this.service.validar(usuario);
        }catch (erro) {
            const msgs = erro.mensagens;
            msgs.forEach(msg => mensagemErro(msg))
            return false;
        }

        this.service.salvar(usuario)
            .then(response => {
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
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="E-mail: *" htmlFor="inputEmail">
                                <input type="email"
                                    id="idInputEmail"
                                    className="form-control"
                                    name="email"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Tipo: *" htmlFor="inputTipo">
                                <div className="form-check">
                                    <RadioButton label="Médico"
                                        id="idRadioMedico"
                                        name="tipoUsuario"
                                        value="MEDICO"
                                        checkedCondition={this.state.tipoUsuario === "MEDICO"}
                                        onChangeEvent={e => this.setState({ tipoUsuario: e.target.value })} />
                                    <RadioButton label="Secretária"
                                        id="idRadioSecretaria"
                                        name="tipoUsuario"
                                        value="SECRETARIA"
                                        checkedCondition={this.state.tipoUsuario === "SECRETARIA"}
                                        onChangeEvent={e => this.setState({ tipoUsuario: e.target.value })} />
                                </div>
                            </FormGroup>
                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    id="idInputSenha"
                                    className="form-control"
                                    name="senha"
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>
                            <FormGroup label="Digite novamente a senha: *" htmlFor="inputSenhaRepeticao">
                                <input type="password"
                                    id="idInputSenhaRepeticao"
                                    className="form-control"
                                    name="senhaRepeticao"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
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
export default withRouter(CadastroUsuario)