import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Inicio from './pages/inicio/Inicio';
import Login from './pages/login/Login';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      token: null
    }
  }

  handleOnChangeToken = (nuevoToken, callback) => this.setState( {token: nuevoToken}, callback ) 

  render() {
    return (
      <BrowserRouter>
        <Route path={["/", "/login"]}>
          <Login handleOnChangeToken={this.handleOnChangeToken}/>
        </Route>
        <Route path="/inicio">
          <Inicio token={this.state.token}/>
        </Route>
      </BrowserRouter>
  
    );
  }
}

export default App;
