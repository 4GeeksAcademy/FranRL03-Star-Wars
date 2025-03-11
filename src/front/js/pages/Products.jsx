import React, { useContext } from "react";
import { Context } from "../store/appContext";


export const Products = () => {

    const { actions } = useContext(Context);

    const getProduct = (id) => {
        console.log(id)
        actions.getOneProduct(id)
    }

    const putProduct = (id) => {
        const data = {
            description: 'modificado'
        }
        console.log(id)
        actions.updateProduct(id, data)
    }

    return (
        <div className="container">
            <h1>Products</h1>
            <button onClick={() => getProduct('1')} type="button">GET Product 1</button>
            <button onClick={() => putProduct('1')} type="button">PUT Product 1</button>
        </div>
    )
}