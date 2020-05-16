import LocalStorageService from './localstorageService'

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService {

    static isUsuarioAutenticado() {
        const usuario = LocalStorageService.getItem(USUARIO_LOGADO)
        return usuario && usuario.id;
    }

    static logout() {
        LocalStorageService.removeItem(USUARIO_LOGADO);
    }

    static autenticar(usuario) {
        LocalStorageService.addItem(USUARIO_LOGADO, usuario);
    }

    static getUsuarioAutenticado() {
        return LocalStorageService.getItem(USUARIO_LOGADO);
    }
}