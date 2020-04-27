import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import { withRouter } from 'react-router-dom'
import { mensagemSucesso, mensagemErro } from '../../components/toastr'

import PacienteService from '../../app/service/pacienteService'

class CadastroPaciente extends React.Component {

    state = {
        nome: '',
    }

    constructor() {
        super();
        this.service = new PacienteService();
    }

    validar = () => {
        const msgs = []

        if (!this.state.nome) {
            msgs.push('Nome é obrigatório.')
        }

        return msgs;
    }

    cadastrar = () => {

        const msgs = this.validar();

        if (msgs && msgs.length > 0) {
            msgs.forEach((msg, index) => {
                mensagemErro(msg);
            });
            return false;
        }

        const paciente = {
            nome: this.state.nome
        }

        this.service.salvar(paciente)
            .then(response => {
                mensagemSucesso("Paciente cadastrado com sucesso!")
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
            <Card title="Cadastro de Paciente">
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
                            <button onClick={this.cadastrar} type="button" className="btn btn-primary">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-secondary">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter(CadastroPaciente)