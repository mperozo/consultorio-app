import React from 'react'
import { withRouter } from 'react-router-dom'
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import * as messages from '../../components/toastr'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import Select from '../../components/select'
import AtendimentoTable from './atendimentoTable'


import AtendimentoService from '../../app/service/atendimentoService'
import UsuarioService from '../../app/service/usuarioService'
import PacienteService from '../../app/service/pacienteService'

class ConsultaAtendimento extends React.Component {

    state = {
        status: '',
        statusDisponiveis: [],
        resultadoAtendimentos: [],
        //Deletar Atendimento
        showConfirmDialog: false,
        atendimentoADeletar: {},
        //Autocomplete medico
        medicosDisponiveis : [],
        medicoSelecionado: null,
        //Autocomplete paciente
        pacientesDisponiveis : [],
        pacienteSelecionado: null
    }

    constructor() {
        super();
        this.atendimentoService = new AtendimentoService();
        this.usuarioService = new UsuarioService();
        this.pacienteService = new PacienteService();

        this.carregarListaStatusDisponiveis();
        this.carregarListaMedicosDisponiveis();
        this.carregarListaPacientesDisponiveis();
    }

    carregarListaMedicosDisponiveis() {
        this.usuarioService
            .buscarMedicos()
            .then(response => {
                this.setState({medicosDisponiveis: response.data})
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    carregarListaPacientesDisponiveis() {
        this.pacienteService
            .buscarPacientes()
            .then(response => {
                this.setState({pacientesDisponiveis: response.data})
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    carregarListaStatusDisponiveis() {
        this.atendimentoService
            .buscarStatusDisponiveis()
            .then(response => {
                this.setState({statusDisponiveis: response.data})
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    buscar = () => {

        const atendimentoFiltro = {
            idMedico: this.state.medicoSelecionado !== null ? this.state.medicoSelecionado.id : null,
            idPaciente: this.state.pacienteSelecionado !== null ? this.state.pacienteSelecionado.id : null,
            status: this.state.status
        }

        this.atendimentoService
            .buscar(atendimentoFiltro)
            .then(response => {
                const lista = response.data;
                if(lista.lenght < 1) {
                    messages.mensagemAlerta("Nenhum resultado encontrado.");
                }
                this.setState({ resultadoAtendimentos: lista })
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    editar = (id) => {
        this.props.history.push(`/cadastro-atendimentos/${id}`)
    }

    deletar = () => {
        this.atendimentoService
            .deletar(this.state.atendimentoADeletar.id)
            .then(response => {
                const atendimentos = this.state.resultadoAtendimentos;
                const index = atendimentos.indexOf(this.state.atendimentoADeletar);
                atendimentos.splice(index, 1);
                this.setState( {atendimentos: atendimentos, showConfirmDialog: false} );
                messages.mensagemSucesso('Atendimento deletado com sucesso!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o atendimento: ' + error.response.data)
            })
    }

    exibirDialogConfirmarExclusao = ( atendimento ) => {
        this.setState({ showConfirmDialog: true, atendimentoADeletar: atendimento })
    }

    fecharDialogConfirmarExclusao = () => {
        this.setState({showConfirmDialog: false, atendimentoADeletar: {} })
    }

    alterarStatus = (atendimento, status) => {
        this.atendimentoService
            .alterarStatus(atendimento.id, status)
            .then( response => {
                const atendimentos = this.state.resultadoAtendimentos;
                const index = atendimentos.indexOf(atendimento);
                if(index !== -1) {
                    atendimento['statusAtendimento'] = status;
                    atendimentos[index] = atendimento;
                    this.setState( {atendimento} )
                }
                messages.mensagemSucesso('Status atualizado com sucesso!!')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar atualizar o status do atendimento: ' + error.response.data)
            });
    }

    render() {

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={this.deletar} className="p-button"/>
                <Button label="Cancelar" icon="pi pi-times" onClick={this.fecharDialogConfirmarExclusao} className="p-button-secondary"/>
            </div>
        );

        return (
            <Card title="Atendimentos"> 
                 <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <FormGroup label="" htmlFor="autocomplete-medico">
                                <Autocomplete
                                    id="autocomplete-medico" 
                                    options={this.state.medicosDisponiveis}
                                    getOptionLabel={(option) => option.nome}
                                    style={{ width: 1000 }}
                                    value={this.state.medicoSelecionado}
                                    onChange={(e, newValue) => this.setState({medicoSelecionado: newValue})}
                                    renderInput={(params) => <TextField {...params} label="Medico" variant="outlined" />}>
                                </Autocomplete>
                            </FormGroup>
                            <FormGroup label="" htmlFor="autocomplete-paciente">
                                <Autocomplete
                                    id="autocomplete-paciente"
                                    options={this.state.pacientesDisponiveis}
                                    getOptionLabel={(option) => option.nome}
                                    style={{ width: 1000 }}
                                    value={this.state.pacienteSelecionado}
                                    onChange={(e, newValue) => this.setState({pacienteSelecionado: newValue})}
                                    renderInput={(params) => <TextField {...params} label="Paciente" variant="outlined" />}>
                                </Autocomplete>
                            </FormGroup>
                            <FormGroup label="" htmlFor="idSelectEstado">
                                <Select id="idSelectEstado"
                                        inputLabel="Estado"
                                        label="Estado"
                                        style={{ width: 500 }}
                                        lista={this.state.statusDisponiveis}
                                        value={this.state.status}
                                        onChange={e => this.setState({status: e.target.value})}>
                                </Select>
                            </FormGroup>
                            <button onClick={this.buscar} 
                                    type="button" 
                                    className="btn btn-primary">
                                    <i className="pi pi-search"></i> Buscar
                            </button>
                            <button onClick={e => this.props.history.push('/cadastro-atendimentos')} 
                                    type="button" 
                                    role="button" 
                                    className="btn btn-secondary">
                                    <i className="pi pi-plus"></i> Cadastrar
                            </button>
                        </div>
                    </div>
                </div>

                <br/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <AtendimentoTable atendimentos={this.state.resultadoAtendimentos} 
                                              deleteAction={this.exibirDialogConfirmarExclusao} 
                                              editAction={this.editar}
                                              alterarStatus={this.alterarStatus} />
                        </div>
                    </div>
                </div>
                <div>
                    <Dialog header="Confirmação" 
                            visible={this.state.showConfirmDialog} 
                            style={{width: '40vw'}} 
                            footer={confirmDialogFooter}
                            modal={true} 
                            onHide={() => this.setState({showConfirmDialog: false})}>
                        Tem certeza que deseja excluir o atendimento?
                    </Dialog>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaAtendimento)