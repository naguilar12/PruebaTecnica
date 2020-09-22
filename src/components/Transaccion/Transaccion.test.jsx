import React from 'react'
import { render } from '@testing-library/react'
import Transaccion from './Transaccion'

test("Transaccion render", async () => {

    //Arrange
    const _id = "#############" 
    const createdDate = new Date().toJSON()
    const type = "earn"
    const value = 5000
    const points = 10

    const transaccion = {
        _id,
        createdDate,
        type,
        value,
        points
    }
    const { findAllByText } = render(<Transaccion transaccion={transaccion}/>)

    //Act
    const tagID = await findAllByText(_id)
    const tagCreatedDate = await findAllByText(createdDate.slice(0,10))
    const tagType = await findAllByText(type)
    const tagValue = await findAllByText(value+"")   
    const tagPoints = await findAllByText(points+"")

    //Assert
    expect(tagID).toHaveLength(1)
    expect(tagCreatedDate).toHaveLength(1)
    expect(tagType).toHaveLength(1)
    expect(tagValue).toHaveLength(1)
    expect(tagPoints).toHaveLength(1)
})