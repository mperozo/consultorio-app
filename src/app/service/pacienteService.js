import ApiService from '../apiService'

class PacienteService extends ApiService {

    constructor() {
        super('/api/pacientes')
    }

    salvar(paciente) {
        return this.post('/salvar', paciente)
    }
}

export default PacienteService