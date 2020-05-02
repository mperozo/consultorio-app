import React from 'react'
import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import Combobox from '../../components/combobox'
import AtendimentoTable from './atendimentoTable'

class ConsultaAtendimento extends React.Component {

    render() {

        const meses = [
            {label: '...', value: ''},
            {label: 'Janeiro', value: '1'},
            {label: 'Fevereiro', value: '2'},
            {label: 'Março', value: '3'},
            {label: 'Abril', value: '4'},
            {label: 'Maio', value: '5'},
            {label: 'Junho', value: '6'},
            {label: 'Julho', value: '7'},
            {label: 'Agosto', value: '8'},
            {label: 'Setembro', value: '9'},
            {label: 'Outubro', value: '10'},
            {label: 'Novembro', value: '11'},
            {label: 'Dezembro', value: '12'}
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
                            <FormGroup label="Ano" htmlFor="inputAno">
                                <input type="text" 
                                        id="idInputAno"
                                        className="form-control"
                                        placeholder="Digite o ano"
                                        name="ano" />
                            </FormGroup>
                            <FormGroup label="Mês" htmlFor="inputMes">
                                <Combobox  id="inputMes" className="form-control" lista={meses} />
                            </FormGroup>
                            <button onClick={this.consultar} type="button" className="btn btn-primary">Consultar</button>
                            <button onClick={this.cadastrar} type="button" className="btn btn-secondary">Cadastrar</button>
                        </div>
                    </div>
                </div>

                <br/>

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <AtendimentoTable atendimentos={atendimentos}/>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(ConsultaAtendimento)