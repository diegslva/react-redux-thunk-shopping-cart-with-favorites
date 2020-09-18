import * as types from './actionsType';
import axios from 'axios';

const client = axios.create({
    baseURL: 'https://6qzt2.csb.app/'
});


export const setProducts = (data) => ({
    type: types.SET_PRODUCTS,
    data
});

export const addFavorite = (data) => ({
    type: types.ADDED_FAVORITE,
    data: { id: data }
});

export const addCart = (data) => ({
    type: types.ADDED_CART,
    data
});

export const removeCart = (data) => ({
    type: types.REMOVED_CART,
    data: { id: data }
});


export const fetchProducts = () => {
    return async (dispatch) => {
        try {
            const resp = await client('/data/products.json');
            console.log(`fetchProducts: ${JSON.stringify(resp.data)}`);
            dispatch(setProducts(resp.data));
        } catch (e) {
            console.log(e);
        }
    };
};
