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

export const traerTransacciones = (token, startDate, endDate) => {
    debugger;
    return fetch(`https://pruebatecnica.puntosleal.com/api/user/my/transactions?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
    })
    .then( res => res.json())
    .catch( res => res )
}