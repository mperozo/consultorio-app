import React from 'react'

export default props => {

    const rows = props.atendimentos.map(atendimento => {
        return (
            <tr key={atendimento.id}>
                <td>{atendimento.nomePaciente}</td>
                <td>{atendimento.nomeMedico}</td>
                <td>{atendimento.statusAtendimento}</td>
                <td></td>
                <td>
                    <button type="button"
                        title="Concluir"
                        className="btn btn-success"
                        disabled={ atendimento.statusAtendimento === 'REALIZADO' }
                        onClick={e => props.alterarStatus(atendimento, 'REALIZADO')} >
                        <i className="pi pi-check"></i>
                    </button>
                    <button type="button"
                        title="Editar"
                        className="btn btn-primary"
                        onClick={e => props.editAction(atendimento.id)} >
                        <i className="pi pi-pencil"></i>
                    </button>
                    <button type="button"
                        title="Cancelar"
                        className="btn btn-warning"
                        disabled={ atendimento.statusAtendimento === 'CANCELADO' }
                        onClick={e => props.alterarStatus(atendimento, 'CANCELADO')} >
                        <i className="pi pi-times"></i>
                    </button>
                    <button type="button"
                        title="Deletar"
                        className="btn btn-danger"
                        onClick={e => props.deleteAction(atendimento)} >
                        <i className="pi pi-trash"></i>
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