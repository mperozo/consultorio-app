import ApiService from '../apiService'

export default class AtendimentoService extends ApiService {

    constructor() {
        super('/api/atendimentos')
    }

    buscar(atendimentoFiltro) {
        
        return this.get('/')
    }
}