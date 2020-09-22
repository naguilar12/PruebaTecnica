import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './transaccion.sass'

/**
 * Dialogo que muestra el detalle de la transaccion seleccionada
 */
class Transaccion extends Component {
    
    /** Referencia al dialogo */
    modalRef = React.createRef();

    /** Se establece un escuchador para el evento mousedown */
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    /** Se quita el escuchador para el evento mousedown cuando el componente se desmonta*/
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    /**
     * Revisa si se da click por fuera del dialogo para que se cierre
     * @public 
     */
    handleClickOutside = (event) => {
        if (this.modalRef && !this.modalRef.current.contains(event.target)) {
            this.props.handleCerrarDialogo()
        }
    }

    render() {
        let { _id, createdDate, type, value, points } = this.props.transaccion
    
        return (
            <div className='fondo-modal-transaccion'>
                <div className='modal-transaccion' ref={this.modalRef}>
                    <h3>Transacción</h3>
                    <div className='datos-transaccion'>
                        <div className='campo-detalle-transaccion'>
                            <b>ID</b>
                            <span>{_id}</span>
                        </div>
                        <div className='campo-detalle-transaccion'>
                            <b>Fecha</b>
                            <span>{createdDate.slice(0,10)}</span>
                        </div>
                        <div className='campo-detalle-transaccion'>
                            <b>Valor</b>
                            <span>{value}</span>
                        </div>
                        <div className='campo-detalle-transaccion'>
                            <b>Puntos</b>
                            <span>{points}</span>
                        </div>
                        <div className='campo-detalle-transaccion campo-tipo'>
                            <b>Tipo</b>
                            <span>{type}</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Transaccion.propTypes = {
    /** Informacion obtenida de la transaccion de interes */
    transaccion: PropTypes.shape({
        /** ID de la transaccion */
        _id: PropTypes.string.isRequired,
        /** Fecha de creacion de la transaccion */
        createdDate: PropTypes.string.isRequired,
        /** Tipo de transaccion */
        type: PropTypes.string.isRequired,
        /** Valor de la transaccion */
        value: PropTypes.number.isRequired,
        /** Puntos de la transaccion */
        points: PropTypes.number.isRequired
    })
}

export default Transaccion
