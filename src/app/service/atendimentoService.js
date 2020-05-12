import ApiService from '../apiService'

export default class AtendimentoService extends ApiService {

    constructor() {
        super('/api/atendimentos')
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
}