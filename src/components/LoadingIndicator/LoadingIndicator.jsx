import React, { Component } from 'react'
import './loading-indicator.sass'
import DotLoader from "react-spinners/DotLoader"


/**
 * Componente encargado de mostrar al usuario que se esta realizando alguna tarea de carga.
 */
const LoadingIndicator = () => {
    return (
        <div className='fondo-indicador-carga'>
            <DotLoader
                color="#ECC400"/>
        </div>
    )
}

export default LoadingIndicator
