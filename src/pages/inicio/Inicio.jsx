import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { traerTransacciones } from '../../api/Api'
import Transaccion from './componentes/Transaccion'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import './inicio.sass'
import LoadingIndicator from '../../components/LoadingIndicator/LoadingIndicator'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

class Inicio extends Component {

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

    componentDidMount() {
        let { token } = this.props
        let { fechaInicio, fechaFin } = this.state
        this.setState({
            cargando: true
        })
        if( token )
            traerTransacciones( token, fechaInicio, fechaFin )
            .then( res => {
                if(res.code === 100)
                    this.setState({
                        transacciones: res.data,
                        cargando: false
                    })
            })
    }

    handleCerrarDialogo = () => this.setState({transaccionActual: null})

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderTransacciones = () => {
        let { transacciones, earn, redeem, value, points } = this.state

        let transaccionesFiltradas = transacciones.filter( transaccion => {

            let requisitos = transaccion.type === "earn" && earn || transaccion.type === "redeem" && redeem
            requisitos &= value.min <= transaccion.value && transaccion.value <= value.max
            requisitos &= points.min <= transaccion.points && transaccion.points <= points.max
            return requisitos
        })

        if(transaccionesFiltradas.length === 0)
            return <tr>
                <td colSpan="4">No hay transacciones</td>
            </tr>

        return transaccionesFiltradas.map( transaccion => 
            <tr>
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

    onBuscarClicked = () => {
        let { token } = this.props
        let { fechaInicio, fechaFin } = this.state
        this.setState({
            cargando: true
        })
        traerTransacciones( token, fechaInicio, fechaFin )
        .then( res => {
            if(res.code === 100)
                this.setState({
                    transacciones: res.data,
                    cargando: false
                })
            
            else if(res.code === 120)
                this.setState({
                    token: null,
                    cargando: false
                })
        })
    }
    
    render() {
        let { transaccionActual, fechaInicio, fechaFin, earn, redeem, value, points, cargando } = this.state
        let { token } = this.props

        if(!token)
            return <Redirect to="/login"/>

        return (
            <div className='pagina-transacciones'>
                <div className='contenido-transacciones'>
                    <div className='barra-filtros'>
                        <h1 className='titulo-transacciones'>Transacciones</h1>
                        <div className='fecha-inputs'>
                            <b>Inicio</b>
                            <input type="date" name='fechaInicio' value={fechaInicio}/>
                            <b>Fin</b>
                            <input type="date" name='fechaFin' value={fechaFin} onChange={this.handleChange}/>
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
                        <Table
                            className='tabla' 
                            responsive striped bordered hover size="sm" style={{backgroundColor: "white"}}>
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

export default Inicio
