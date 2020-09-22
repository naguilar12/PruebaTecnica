import React, { Component } from 'react'
import './login.sass'
import { login } from '../../api/Api'
import { Redirect } from 'react-router-dom'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import PropTypes from 'prop-types'

/**
 * Página de login del usuario.
 */
class Login extends Component {

    /** Inicialización del estado del componente */
    state = {
        email: "",
        password: "",
        error: "",
        cargando: false
    }

    /**
     * Funcion encargada de escuhar los cambios en los campos de texto y hacer los ajustes correspondientes en el estado
     * @public
     */
    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    /**
     * Funcion encargada de enviar las credenciales al servidor y manejar la respuesta para decidir lo que se le muestra al usuario
     * @public
     */
    onSubmit = (e) => {
        e.preventDefault()
        let { email, password } = this.state
        /** Se indica que se esta cargando la respuesta del servidor */
        this.setState({ cargando: true, error: "" })
        /** Se hace un llamado a la función auxiliar que se contacta con el servidor */
        login( email, password )
        .then( res => {
            /** Se indica que ya se obtuvo la respuesta del servidor*/
            this.setState({ cargando: false})
            /** 
             * En caso de que la solicitud de login al servidor sea exitosa se cambia el estado del componente
             *  Si existe un error, se le comunica al usuario
            */
            if(res.code === 100) 
                this.props.handleOnChangeToken(res.token)
            else if(res.code === 101 || res.code === 102 || res.code === 130) 
                this.setState({
                    error: res.message
                })
            else {
                this.setState({
                    error: "Ocurrio un error en el inicio de sesión, por favor intente más tarde"
                })
            }
        })
    }

    render() {
        let { cargando, error, estado } = this.state
        let { token } = this.props
        /** En caso de que la solicitud de login es exitosa se redirige al usuario a la pagina de inicio */
        if( token )
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

Login.propTypes = {
    /** Funcion que facilita el manejo del estado de la aplicación una vez se obtiene el token del servidor */
    handleOnChangeToken: PropTypes.func.isRequired,
}

export default Login