import ApiService from '../apiService'

class PacienteService extends ApiService {

    constructor() {
        super('/api/pacientes')
    }

    salvar(paciente) {
        return this.post('/salvar', paciente)
    }

    buscarPacientes() {
        return this.get('')
    }
}

export default PacienteService