import React, { Fragment,useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';
import shortid from 'shortid';


const Formulario = ({guardarGasto,guardarCrearGasto}) => {

    const [nombre, guardarNombre] = useState('');
    const [cantidad, guardarCantidad] = useState(0);
    const [error, guardarError] = useState(false);

    //Usuario agregue un gasto
    const agregarGasto =e=>{
        e.preventDefault();

        //Validate
        if (cantidad<1|| isNaN(cantidad)||nombre.trim()==='') {
            guardarError(true);
            return;
        }
        guardarError(false);
        //Build speding
        const gasto ={
            nombre,
            cantidad,
            id:shortid.generate()
            
        }
        //Move to main component
        guardarGasto(gasto);
        guardarCrearGasto(true);
        //Reset al form
        guardarNombre('')
        guardarCantidad('0')
    }

    return ( 
    <Fragment>
        <form onSubmit={agregarGasto}>
            <h2>Agrega tus gastos aquí</h2>
            {error? <Error mensaje="Todos los campos son requeridos"
            />:null}
            <div className="campo">
                <label>Nombre Gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    value={nombre}
                    onChange={e=>guardarNombre(e.target.value)}
                />
            </div>
            <div className="campo">
                <label>Cantidad Gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    value={cantidad}
                    onChange={e=>guardarCantidad(parseInt(e.target.value,10))}
                />
            </div>
            <input
                type="submit"
                className="button-primary u-full-width"
                value="Agregar Gasto"
            />
        </form>
   </Fragment> );
}
 Formulario.propTypes={
     guardarGasto:PropTypes.func.isRequired,
     guardarCrearGasto:PropTypes.func.isRequired
 }
export default Formulario;