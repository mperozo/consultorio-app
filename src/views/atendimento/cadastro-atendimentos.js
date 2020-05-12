import React from 'react'

import Card from '../../components/card'
import FormGroup from '../../components/form-group'

import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

import AtendimentoService from '../../app/service/atendimentoService'
import UsuarioService from '../../app/service/usuarioService'
import PacienteService from '../../app/service/pacienteService'

import * as messages from '../../components/toastr'
import { withRouter } from 'react-router-dom'

class CadastroAtendimentos extends React.Component {

    state = {
        dataConsulta: new Date(),
        //Autocomplete medico
        medicosDisponiveis: [],
        medicoSelecionado: null,
        //Autocomplete paciente
        pacientesDisponiveis: [],
        pacienteSelecionado: null
    }

    constructor() {
        super();
        this.atendimentoService = new AtendimentoService();
        this.usuarioService = new UsuarioService();
        this.pacienteService = new PacienteService();

        this.carregarListaMedicosDisponiveis();
        this.carregarListaPacientesDisponiveis();
    }

    carregarListaMedicosDisponiveis() {
        this.usuarioService
            .buscarMedicos()
            .then(response => {
                this.setState({ medicosDisponiveis: response.data })
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    carregarListaPacientesDisponiveis() {
        this.pacienteService
            .buscarPacientes()
            .then(response => {
                this.setState({ pacientesDisponiveis: response.data })
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    cadastrar =() => {

        const { medicoSelecionado, pacienteSelecionado } = this.state;

        const atendimento = { 
            idMedico: medicoSelecionado.id, 
            idPaciente: pacienteSelecionado.id
         }

        this.atendimentoService
            .salvar(atendimento)
            .then(response => {
                messages.mensagemSucesso('Atendimento cadastrado com sucesso!')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }

    render() {
        return (
            <Card title="Cadastro de atendimento">
                <div>
                    <FormGroup label="" htmlFor="autocomplete-medico">
                        <Autocomplete
                            id="autocomplete-medico"
                            options={this.state.medicosDisponiveis}
                            getOptionLabel={(option) => option.nome}
                            style={{ width: 1000 }}
                            value={this.state.medicoSelecionado}
                            onChange={(e, newValue) => this.setState({ medicoSelecionado: newValue })}
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
                            onChange={(e, newValue) => this.setState({ pacienteSelecionado: newValue })}
                            renderInput={(params) => <TextField {...params} label="Paciente" variant="outlined" />}>
                        </Autocomplete>
                    </FormGroup>
                    <FormGroup label="" htmlFor="date-picker-dataConsulta">
                        <MuiPickersUtilsProvider utils={DateFnsUtils} >
                            <KeyboardDatePicker
                                margin="normal"
                                id="date-picker-dataConsulta"
                                label="Data da consulta"
                                format="MM/dd/yyyy"
                                value={this.state.dataConsulta}
                                onChange={(e, newValue) => this.setState({ dataConsulta: newValue })}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </FormGroup>
                    <div className="row">
                        <div className="col-md-6">
                            <button onClick={this.cadastrar} type="button" className="btn btn-primary">Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-secondary">Cancelar</button>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}
export default withRouter(CadastroAtendimentos)