import React from 'react'

export default props => {

    const rows = props.atendimentos.map( atendimento => {
        return (
            <tr key={atendimento.id}>
                <td>{atendimento.nomePaciente}</td>
                <td>{atendimento.nomeMedico}</td>
                <td>{atendimento.statusAtendimento}</td>
            </tr>
        )
    })

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Paciente</th>
                    <th>Médico</th>
                    <th>Status</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}