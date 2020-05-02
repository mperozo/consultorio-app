import React from 'react'
import { withRouter } from 'react-router-dom'
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
        resultadoAtendimentos: []
    }

    constructor() {
        super();
        this.service = new AtendimentoService();
    }

    componentWillMount() {

        this.service
            .buscarStatusDisponiveis()
            .then(resposta => {
                this.setState({statusDisponiveis: resposta.data})
            }).catch(error => {
                //TODO colocar mensagem do toastr
                console.log("ERRO");
            })

            // Obter a lista de medicos disponíveis e pacientes disponíveis
    }

    buscar = () => {

        console.log(this.state.status);

        const lancamentoFiltro = {
            idMedico: this.state.idMedico,
            idPaciente: this.state.idPaciente,
            status: this.state.status
        }

        this.service
        .buscar(lancamentoFiltro)
        .then(resposta => {
            this.setState({ resultadoAtendimentos: resposta.data })
            console.log(this.state.resultadoAtendimentos);
        }).catch(error => {
            //TODO colocar mensagem do toastr
            console.log("ERRO");
        })
    }

    render() {

        const pacientes = [
            {label: '...', value: ''},
            {label: 'Marcos Perozo', value: '1'},
            {label: 'Bianca Fragoso', value: '2'}
        ]

        const medicos = [
            {label: '...', value: ''},
            {label: 'Andrea Fragoso Perozo', value: '1'}
        ]
        
        const atendimentos = [
            {
                id: 1,
                paciente: 'Marcos',
                medico: 'Andrea',
                status: 'Agendado',
                data: '21/11/2022'
            },
            {
                id: 2,
                paciente: 'Bianca',
                medico: 'Andrea',
                status: 'Agendado',
                data: '21/11/2022'
            }
        ]

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
                            <AtendimentoTable atendimentos={this.state.resultadoAtendimentos}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaAtendimento)