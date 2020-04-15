import React from 'react';

import Rota from './rotas'

import 'bootswatch/dist/cerulean/bootstrap.css';
import '../custom.css';

class App extends React.Component {

  render() {
    return (
      <div>
        <Rota />
      </div>
    )
  }
}

export default App