import ApiService from '../apiService'

import ErroValidacao from '../exception/erroValidacao'

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
        return this.get('/buscar-por-tipo?tipo=MEDICO')
    }

    buscarSecretarias() {
        return this.get('/buscar-por-tipo?tipo=SECRETARIA')
    }

    validar(usuario) {
        const erros = []
        if (!usuario.nome) {
            erros.push('Nome é obrigatório.')
        }

        if (!usuario.email) {
            erros.push('E-mail é obrigatório.')
        } else if (!usuario.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            erros.push('Email inválido')
        }

        if (!usuario.senha || !usuario.senhaRepeticao) {
            erros.push('Senha é obrigatória.')
        } else if (usuario.senha !== usuario.senhaRepeticao) {
            erros.push('As senhas devem ser iguais.')
        }

        if (!usuario.tipoUsuario) {
            erros.push('Tipo de usuário é obrigatório.')
        }

        if(erros && erros.length > 0) {
            throw new ErroValidacao(erros);
        }
    }
}

export default UsuarioService