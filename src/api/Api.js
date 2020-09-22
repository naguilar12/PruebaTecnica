/** 
 * Funcion encargada de hacer la peticion POST al servidor para obtener el token de autorizacion
 * que permite acceder a los datos del usuario
 */
export const login = (email, password) => {
    return fetch("https://pruebatecnica.puntosleal.com/api/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then( res => res.json())
    .catch( r => r )
}

/** 
 * Funcion encargada de traer las transacciones del usuario filtradas por un periodo de tiempo determinado
 */
export const traerTransacciones = (token, startDate, endDate) => {
    return fetch(`https://pruebatecnica.puntosleal.com/api/user/my/transactions?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    })
    .then( res => res.json())
    .catch( res => res )
}