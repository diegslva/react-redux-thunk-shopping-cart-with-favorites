import { combineReducers } from 'redux';
import * as types from './actionsType';

const vitrineInitialState = {
	isLoading: false,
	products: [],
	cart: { products: [], total: 0 }
};

const vitrine = (state = vitrineInitialState, action) => {
	switch (action.type) {
		case types.SET_PRODUCTS:
			return { ...state, products: [...action.data] };
		case types.REMOVED_CART:
			const hasBeenFound = state.cart.products.find(
				(p) => p.id === action.data.id
			);
			if (hasBeenFound) {
				const withItemRemoved = [
					...state.cart.products.filter((p) => p.id !== action.data.id)
				];
				const newTotal = withItemRemoved.reduce((acc, item) => {
					return acc + item.price * item.quantity;
				}, 0);
				return {
					...state,
					cart: {
						...state.cart,
						products: [...withItemRemoved],
						total: newTotal
					}
				};
			}
			return state;

		case types.ADDED_CART:
			const canBeAdded = state.products.find((p) => p.id === action.data.id);

			if (canBeAdded) {
				let products = [];
				const hasBeenAdded = state.cart.products.find(
					(p) => p.id === action.data.id
				);
				if (hasBeenAdded) {
					const itemFound = state.cart.products.find(
						(p) => p.id === action.data.id
					);
					const currentQtd = itemFound && itemFound.quantity;
					const newItemAdded = {
						...action.data,
						quantity: currentQtd + 1
					};

					products = [
						...state.cart.products.filter((p) => p.id !== newItemAdded.id),
						newItemAdded
					];
				} else {
					const newItemAdded = { ...action.data, quantity: 1 };
					products = [...state.cart.products, { ...newItemAdded }];
				}

				const total = products.reduce((acc, item) => {
					return acc + item.price * item.quantity;
				}, 0);
				return { ...state, cart: { products: [...products], total } };
			}
			return state;
		default:
			return state;
	}
};

const favoritesInitialState = {
	products: []
};

const favorites = (state = favoritesInitialState, action) => {
	switch (action.type) {
		case types.ADDED_FAVORITE:
			const hasBeenSaved = state.products.find((p) => p.id === action.data.id);
			if (hasBeenSaved) {
				return {
					...state,
					products: [...state.products.filter((p) => p.id !== action.data.id)]
				};
			}
			return { ...state, products: [...state.products, action.data] };
		default:
			return state;
	}
};

const appReducer = combineReducers({ vitrine, favorites });

export default appReducer;
