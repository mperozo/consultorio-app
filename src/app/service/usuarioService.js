import ApiService from '../apiService'

class UsuarioService extends ApiService {

    constructor() {
        super('/api/usuarios')
    }

    autenticar(credenciais) {
        return this.post('/autenticar', credenciais)
    }

    salvar(usuario) {
        return this.post('/salvar', usuario)
    }

    buscarMedicos() {
        return this.post('/buscar-por-tipo?tipo=MEDICO')
    }

    buscarSecretarias() {
        return this.post('/buscar-por-tipo?tipo=SECRETARIA')
    }
}

export default UsuarioService