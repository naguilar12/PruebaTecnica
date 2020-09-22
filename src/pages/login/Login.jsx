import React, { Component } from 'react'
import './login.sass'
import { login } from '../../api/Api'
import { Redirect } from 'react-router-dom'
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: "",
            estado: "",
            error: "",
            cargando: false
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        let { email, password } = this.state
        this.setState({ cargando: true, error: "" })
        login( email, password )
        .then( res => {

            this.setState({ cargando: false})

            if(res.code === 100) 
                this.props.handleOnChangeToken(res.token, () => this.setState({
                    estado: "EXITOSO"
                }))
            
            else if(res.code === 101 || res.code === 102 || res.code === 130) {
                this.setState({
                    error: res.message
                })
            }

            else {
                this.setState({
                    error: "Ocurrio un error en el inicio de sesión, por favor intente más tarde"
                })
            }
        })
    }

    render() {
        let { cargando, error } = this.state

        if(this.state.estado === "EXITOSO")
            return <Redirect to="/inicio"/>

        return (
            <div className='contenedor-login'>
                <form className='dialogo-login' onSubmit={this.onSubmit}>
                    <h2>Iniciar sesión</h2>
                    <div className='campos-login'>
                        <div>Correo electrónico</div>
                        <input placeholder='Correo Electrónico' name="email" type="text" required onChange={this.onChange}/>
                        <div>Contraseña</div>
                        <input placeholder='Contraseña' name="password"type="password" required onChange={this.onChange}/>
                    </div>
                    {
                        error && 
                        <div className='error'>{error}</div>
                    }
                    <button type="submit">Iniciar</button>
                </form>
                {
                    cargando &&
                    <LoadingIndicator/>
                }
            </div>
        )
    }
}
