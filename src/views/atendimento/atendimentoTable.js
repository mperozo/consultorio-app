import React from 'react'

export default props => {

    const rows = props.atendimentos.map( atendimento => {
        return (
            <tr key={atendimento.id}>
                <td>{atendimento.nomePaciente}</td>
                <td>{atendimento.nomeMedico}</td>
                <td>{atendimento.statusAtendimento}</td>
                <td></td>
                <td>
                    <button type="button" 
                            className="btn btn-primary"
                            onClick={e => props.editAction(atendimento.id)} >
                            Editar
                    </button>
                    <button type="button" 
                            className="btn btn-danger" 
                            onClick={e => props.deleteAction(atendimento)} >
                            Deletar
                    </button>
                </td>
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
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}