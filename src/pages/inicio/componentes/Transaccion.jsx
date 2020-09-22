import React, { Component } from 'react'
import './transaccion.sass'

class Transaccion extends Component {

    modalRef = React.createRef();
    
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (this.modalRef && !this.modalRef.current.contains(event.target)) {
            this.props.handleCerrarDialogo()
        }
    }

    render() {
        let { _id, createdDate, type, value, points } = this.props.transaccion
    
        return (
            <div className='modal-transaccion'>
                <div className='modal' ref={this.modalRef}>
                    <b>Transacción</b>
                    <div className='datos-transaccion'>
                        <div>
                            <b>ID</b>
                            <div>{_id}</div>
                        </div>
                        <div>
                            <b>Fecha</b>
                            <div>{createdDate.slice(0,10)}</div>
                        </div>
                        <div>
                            <b>Valor</b>
                            <div>{value}</div>
                        </div>
                        <div>
                            <b>Puntos</b>
                            <div>{points}</div>
                        </div>
                        <div className='campo-tipo'>
                            <b>Tipo</b>
                            <div>{type}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Transaccion
