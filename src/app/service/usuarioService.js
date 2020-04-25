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
}

export default UsuarioService