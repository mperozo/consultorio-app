import React from 'react';

import Rotas from './rotas'
import NavBar from '../components/navbar'
import ProvedorAutenticacao from './provedorAutenticacao'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/cerulean/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.min.css'

import 'primereact/resources/themes/nova-light/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

class App extends React.Component {

  render() {
    return (
      <ProvedorAutenticacao>
        <NavBar />
        <div className="container">
          <Rotas />
        </div>
      </ProvedorAutenticacao>
    )
  }
}

export default App