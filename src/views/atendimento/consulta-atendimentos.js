import React from 'react'
import { withRouter } from 'react-router-dom'
import {Dialog} from 'primereact/dialog';
import {Button} from 'primereact/button';

import * as messages from '../../components/toastr'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import Combobox from '../../components/combobox'
import AtendimentoTable from './atendimentoTable'

import AtendimentoService from '../../app/service/atendimentoService'


class ConsultaAtendimento extends React.Component {

    state = {
        idMedico: '',
        idPaciente: '',
        status: '',
        statusDisponiveis: [],
        medicosDisponiveis: [],
        pacientesDisponiveis: [],
        resultadoAtendimentos: [],
        showConfirmDialog: false,
        atendimentoADeletar: {}
    }

    constructor() {
        super();
        this.service = new AtendimentoService();
    }

    componentWillMount() {
        this.service
            .buscarStatusDisponiveis()
            .then(response => {
                this.setState({statusDisponiveis: response.data})
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })

            // Obter a lista de medicos disponíveis e pacientes disponíveis
    }

    buscar = () => {
        const lancamentoFiltro = {
            idMedico: this.state.idMedico,
            idPaciente: this.state.idPaciente,
            status: this.state.status
        }

        this.service
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

    exibirDialogConfirmarExclusao = ( atendimento ) => {
        this.setState({ showConfirmDialog: true, atendimentoADeletar: atendimento })
    }

    fecharDialogConfirmarExclusao = () => {
        this.setState({showConfirmDialog: false, atendimentoADeletar: {} })
    }

    deletar = () => {
        this.service
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