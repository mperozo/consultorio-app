import React from 'react';

import Rotas from './rotas'
import NavBar from '../components/navbar'

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/cerulean/bootstrap.css';
import '../custom.css';
import 'toastr/build/toastr.min.css'

class App extends React.Component {

  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          <Rotas />
        </div>
      </>
    )
  }
}

export default App