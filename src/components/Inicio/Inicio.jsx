import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { traerTransacciones } from '../../api/Api'
import Transaccion from './../Transaccion/Transaccion'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import './inicio.sass'
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types'

/**
 * Página principal en la que se muestran las transacciones del usuario y se le da la posibilidad de filtrarlas.
 */
class Inicio extends Component {

    /** Inicialización del estado del componente */
    state = {
        transacciones: [],
        transaccionActual: null,
        fechaInicio: new Date("2018-11-01").toJSON().slice(0,10),
        fechaFin: new Date("2018-11-15").toJSON().slice(0,10),
        earn: true,
        redeem: true,
        value: {min: 0, max: 50000},
        points: {min: 0, max: 50},
        cargando: false,
        error: ""
    }

    /**
     * Solicita la informacion de las transacciones del usuario
    */
    componentDidMount() {
        let { token } = this.props
        let { fechaInicio, fechaFin } = this.state
        /** Se indica que se esta cargando la respuesta del servidor */
        this.setState({
            cargando: true
        })
        /** Se revisa primero si se tiene el token obtenido en el login para hacer la solicitud */
        if( token )
            /** 
             * En caso de que la solicitud de las transacciones al servidor sea exitosa se 
             * guardan las transacciones en el estado del componente
            */
            traerTransacciones( token, fechaInicio, fechaFin )
            .then( res => {
                if(res.code === 100)
                    this.setState({
                        transacciones: res.data,
                        cargando: false
                    })
                else if(res.code === 120) {
                    this.props.handleOnChangeToken(null)
                    this.setState({
                        cargando: false
                    })
                }
                else {
                    this.props.handleOnChangeToken(null)
                    this.setState({
                        cargando: false
                    })
                }
            })
    }

    /**
     * Funcion encargada de cerrar el dialogo que muestra el detalle de la transaccion
     * @public
     */
    handleCerrarDialogo = () => this.setState({transaccionActual: null})

    
    /**
     * Funcion encargada de escuhar los cambios en los campos de texto y hacer los ajustes correspondientes en el estado
     * @public
     */
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    
    /**
     * Funcion encargada de aplicar los filtros correspondientes a las transacciones y renderizar las filas de la tabla
     * @public
     */
    renderTransacciones = () => {
        let { transacciones, earn, redeem, value, points } = this.state

        /** Filtro de las transacciones */
        let transaccionesFiltradas = transacciones.filter( transaccion => {
            /** Filtro por tipo */
            let requisitos = (transaccion.type === "earn" && earn) || (transaccion.type === "redeem" && redeem)
            /** Filtro por valor */
            requisitos &= (value.min <= transaccion.value) && (transaccion.value <= value.max)
            /** Filtro por puntos */
            requisitos &= (points.min <= transaccion.points) && (transaccion.points <= points.max)
            return requisitos
        })

        /** Respuesta en caso de que despues del filtro no queden transacciones */
        if(transaccionesFiltradas.length === 0)
            return <tr>
                <td colSpan="4">No hay transacciones</td>
            </tr>
        
        /** Renderizacion de las transacciones resultantes */
        return transaccionesFiltradas.map( transaccion => 
            <tr key={transaccion._id}>
                <td>{transaccion._id}</td>
                <td>{transaccion.createdDate.slice(0,10)}</td>
                <td>{transaccion.type}</td>
                <td className='ver-detalle' onClick={ () => {
                    this.setState({
                        transaccionActual: transaccion
                    })
                }}>Ver</td>
            </tr>
        )
    }

    
    /**
     * Funcion encargada de buscar transacciones del usuario en un periodo de tiempo en especifico
     * @public
     */
    onBuscarClicked = () => {
        let { token } = this.props
        let { fechaInicio, fechaFin } = this.state
        this.setState({
            cargando: true
        })
        /** 
        * En caso de que la solicitud de las transacciones al servidor sea exitosa se 
        * guardan las transacciones en el estado del componente
        * Si ocurre un error o el token no es valido, se devuelve al usuario al login
        */
        traerTransacciones( token, fechaInicio, fechaFin )
        .then( res => {
                if(res.code === 100)
                    this.setState({
                        transacciones: res.data,
                        cargando: false
                    })
                else if(res.code === 120) {
                    this.props.handleOnChangeToken(null)
                    this.setState({
                        cargando: false
                    })
                }
                else {
                    this.props.handleOnChangeToken(null)
                    this.setState({
                        cargando: false
                    })
                }
        })
    }
    
    render() {
        let { transaccionActual, fechaInicio, fechaFin, earn, redeem, value, points, cargando } = this.state
        let { token } = this.props

        if(!token)
            return <Redirect to="/"/>

        return (
            <div className='pagina-transacciones'>
                <div className='contenido-transacciones'>
                    <div className='barra-filtros'>
                        <h1 className='titulo-transacciones'>Transacciones</h1>
                        <div className='fecha-inputs'>
                            <b>Inicio</b>
                            <input type="date" name='fechaInicio' value={fechaInicio} onChange={this.handleChange} max={fechaFin}/>
                            <b>Fin</b>
                            <input type="date" name='fechaFin' value={fechaFin} onChange={this.handleChange} min={fechaInicio}/>
                        </div>
                        <button className='btn-buscar' onClick={this.onBuscarClicked}>Actualizar</button>
                        <div className='titulo-tipo'>
                            Tipo
                        </div>
                        <div className='checkboxes'>
                            <div className='checkbox-type'>
                                <input type="checkbox" name="earn" checked={earn} onChange={() => this.setState({earn: !this.state.earn})}/>
                                earn
                            </div>
                            <div className='checkbox-type'>
                                <input type="checkbox" name="redeem" checked={redeem} onChange={() => this.setState({redeem: !this.state.redeem})}/>
                                redeem
                            </div>
                        </div>
                        <div className='contenedor-rango-valor'>
                            <b>Rango de valor</b>
                            <InputRange
                                step={1000}
                                maxValue={50000}
                                minValue={0}
                                value={value}
                                onChange={value => this.setState({ value })}/>
                        </div>
                        <div className='contenedor-rango-valor'>
                            <b>Rango de puntos</b>
                            <InputRange
                                step={5}
                                maxValue={50}
                                minValue={0}
                                value={points}
                                onChange={points => this.setState({ points })}/>
                        </div>
                    </div>                    
                    <div className='contenedor-transacciones'>
                        <h1>Tabla de transacciones</h1>
                        <Table
                            variant="dark"
                            className='tabla' 
                            responsive striped bordered hover size="sm" >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Fecha</th>
                                    <th>Tipo</th>
                                    <th>Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.renderTransacciones()
                                }
                            </tbody>
                        </Table>
                    </div>
                    {
                        transaccionActual &&
                        <Transaccion transaccion={transaccionActual} handleCerrarDialogo={this.handleCerrarDialogo}/>
                    }
                    {
                        cargando &&
                        <LoadingIndicator/>
                    }
                </div>
            </div>
        )
    }
}

Inicio.propTypes = {
    /** Token de acceso obtenido del servidor una vez se realizo el login */
    token: PropTypes.string,
}

export default Inicio
