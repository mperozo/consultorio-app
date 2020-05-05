import React from 'react'
import { withRouter } from 'react-router-dom'
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';
import {AutoComplete} from 'primereact/autocomplete';

import * as messages from '../../components/toastr'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import Combobox from '../../components/combobox'
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
        medicoSuggestions: null,
        medicoSelecionado: null,
        //Autocomplete paciente
        pacientesDisponiveis : [],
        pacienteSuggestions: null,
        pacienteSelecionado: null
    }

    constructor() {
        super();
        this.atendimentoService = new AtendimentoService();
        this.usuarioService = new UsuarioService();
        this.pacienteService = new PacienteService();

        this.montarComboboxStatus();
        this.montarAutocompleteMedico();
        this.montarAutocompletePaciente();
    }

    suggestMedicos(event) {
        let results = this.state.medicosDisponiveis.filter((medico) => {
            return medico.nome.toLowerCase().startsWith(event.query.toLowerCase());
       });
       this.setState({ medicoSuggestions: results });
    }

    suggestPacientes(event) {
        let results = this.state.pacientesDisponiveis.filter((paciente) => {
            return paciente.nome.toLowerCase().startsWith(event.query.toLowerCase());
       });
       this.setState({ pacienteSuggestions: results });
    }

    montarAutocompleteMedico() {
        this.usuarioService
            .buscarMedicos()
            .then(response => {
                this.setState({medicosDisponiveis: response.data})
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    montarAutocompletePaciente() {
        this.pacienteService
            .buscarPacientes()
            .then(response => {
                this.setState({pacientesDisponiveis: response.data})
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    montarComboboxStatus() {
        this.atendimentoService
            .buscarStatusDisponiveis()
            .then(response => {
                this.setState({statusDisponiveis: response.data})
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    buscar = () => {

        const lancamentoFiltro = {
            idMedico: this.state.medicoSelecionado !== null ? this.state.medicoSelecionado.id : null,
            idPaciente: this.state.pacienteSelecionado !== null ? this.state.pacienteSelecionado.id : null,
            status: this.state.status
        }

        this.atendimentoService
            .buscar(lancamentoFiltro)
            .then(response => {
                this.setState({ resultadoAtendimentos: response.data })
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    editar = (id) => {
        console.log('editando ', id);
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
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o lançamento: ' + error.response.data)
            })
    }

    exibirDialogConfirmarExclusao = ( atendimento ) => {
        this.setState({ showConfirmDialog: true, atendimentoADeletar: atendimento })
    }

    fecharDialogConfirmarExclusao = () => {
        this.setState({showConfirmDialog: false, atendimentoADeletar: {} })
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
                            <FormGroup label="Medico" htmlFor="inputMedico">
                                <br></br>
                                <AutoComplete id="inputMedico"
                                              inputClassName="form-control"
                                              field="nome"
                                              value={this.state.medicoSelecionado} 
                                              onChange={(e) => this.setState({medicoSelecionado: e.value})}
                                              suggestions={this.state.medicoSuggestions} 
                                              completeMethod={this.suggestMedicos.bind(this)} />
                            </FormGroup>
                            <FormGroup label="Paciente" htmlFor="inputPaciente">
                                <br></br>
                                <AutoComplete id="inputPaciente"
                                              inputClassName="form-control"
                                              field="nome"
                                              value={this.state.pacienteSelecionado} 
                                              onChange={(e) => this.setState({pacienteSelecionado: e.value})}
                                              suggestions={this.state.pacienteSuggestions} 
                                              completeMethod={this.suggestPacientes.bind(this)} />
                            </FormGroup>
                            <FormGroup label="Estado" htmlFor="inputStatus">
                                <Combobox  id="inputStatus" 
                                            className="form-control" 
                                            lista={this.state.statusDisponiveis} 
                                            value={this.state.status}
                                            onChange={e => this.setState({status: e.target.value})} />
                            </FormGroup>
                            <button onClick={this.buscar} type="button" className="btn btn-primary">Consultar</button>
                            <button onClick={this.cadastrar} type="button" className="btn btn-secondary">Cadastrar</button>
                        </div>
                    </div>
                </div>

                <br/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <AtendimentoTable atendimentos={this.state.resultadoAtendimentos} 
                                              deleteAction={this.exibirDialogConfirmarExclusao} 
                                              editAction={this.editar}/>
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