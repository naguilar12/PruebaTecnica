import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Inicio from './components/Inicio/Inicio';
import Login from './components/Login/Login';

/**
 * Contenedor de toda la aplicacion web
 */
class App extends React.Component {

  state = {
    /** Token que permite el acceso a los datos en el servidor */
    token: null
  }
  
  /** Actualiza el token una vez se recibe respuesta del servidor */
  handleOnChangeToken = nuevoToken => this.setState( {token: nuevoToken}) 

  render() {
    return (
      /** De acuerdo a la ruta actual se decide que componente se renderiza */
      <BrowserRouter>
        <Route path={["/", "/login"]}>
          <Login token={this.state.token} handleOnChangeToken={this.handleOnChangeToken}/>
        </Route>
        <Route path="/inicio">
          <Inicio token={this.state.token} handleOnChangeToken={this.handleOnChangeToken}/>
        </Route>
      </BrowserRouter>
  
    );
  }
}

export default App;
