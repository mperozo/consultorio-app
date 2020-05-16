import React from 'react'

import AuthService from '../app/service/authService'

// Utilizando o API Context do React
export const AuthContext = React.createContext()
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;

class ProvedorAutenticacao extends React.Component {

    state = {
        usuarioAutenticado: null,
        isAutenticado: false
    }

    iniciarSessao = (usuario) => {
        AuthService.autenticar(usuario);
        this.setState({ usuarioAutenticado: usuario, isAutenticado: true });
    }

    encerrarSessao = () => {
        AuthService.logout();
        this.setState({ usuarioAutenticado: null, isAutenticado: false });
    }

    render() {
        const contexto = {
            usuarioAutenticado: this.state.usuarioAutenticado,
            isAutenticado: this.state.isAutenticado,
            iniciarSessao: this.iniciarSessao,
            encerrarSessao: this.encerrarSessao
        }

        // TIP: quando um filho chamar o iniciarSessao, vai atualizar o state e vai atualizar para todos os filhos.
        return(
            <AuthProvider value ={contexto}>
                {this.props.children}
            </AuthProvider>
        )
    }
}
export default ProvedorAutenticacao