import React, { Component } from 'react'
import './loading-indicator.sass'
import DotLoader from "react-spinners/DotLoader";

export default class LoadingIndicator extends Component {
    render() {
        return (
            <div className='fondo-indicador-carga'>
                <DotLoader
                    // size={150}
                    color="#ECC400"/>
            </div>
        )
    }
}
