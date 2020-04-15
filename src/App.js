import React from 'react';

import Login from './views/login'

import 'bootswatch/dist/cerulean/bootstrap.css';
import './custom.css';

class App extends React.Component {
  
  render() {
    return (
      <div>
        <Login />
      </div>
    )
  }
}

export default App