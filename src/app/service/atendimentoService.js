import ApiService from '../apiService'

import ErroValidacao from '../exception/erroValidacao'

export default class AtendimentoService extends ApiService {

    constructor() {
        super('/api/atendimentos')
    }

    buscarPorId(id) {
        return this.get(`/${id}`)
    }

    buscar(atendimentoFiltro) {
        
        let params = `?`;

        if(atendimentoFiltro.idMedico) {
            params = `${params}idMedico=${atendimentoFiltro.idMedico}&`
        }

        if(atendimentoFiltro.idPaciente) {
            params = `${params}idPaciente=${atendimentoFiltro.idPaciente}&`
        }

        if(atendimentoFiltro.status) {
            params = `${params}statusAtendimento=${atendimentoFiltro.status}&`
        }

        return this.get(params.slice(0, -1))
    }

    buscarStatusDisponiveis() {
        return this.get('/status-disponiveis')
    }

    deletar(id) {
        return this.delete(`/${id}`)
    }

    salvar(atendimento) {
        return this.post(`/salvar`, atendimento)
    }

    atualizar(atendimento) {
        return this.put(`/${atendimento.id}`, atendimento)
    }

    alterarStatus(id, status) {
        return this.put(`/${id}/atualizar-status`, { status })
    }

    validar(atendimento) {
        const erros = [];

        if(!atendimento.idMedico) {
            erros.push("Médico é obrigatório");
        }

        if(!atendimento.idPaciente) {
            erros.push("Paciente é obrigatório");
        }

        if(erros && erros.length > 0) {
            throw new ErroValidacao(erros)
        }
    }
}