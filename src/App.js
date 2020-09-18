import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.css';
import { FiHeart } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import { CgRemove } from 'react-icons/cg';
import { MdAddShoppingCart } from 'react-icons/md';
import * as actions from './actions';

const ShoppingApp = () => {
	const products = useSelector((state) => state.vitrine.products);
	const favorites = useSelector((state) => state.favorites.products);
	const cartItems = useSelector((state) => state.vitrine.cart);
	const dispatch = useDispatch();

	useEffect(() => {
		console.log('initial render');
		dispatch(actions.fetchProducts());
	}, [dispatch]);

	const handleAddFavorite = ({ id }) => {
		dispatch(actions.addFavorite(id));
	};

	const hasBeenFavorite = ({ id }) => {
		if (favorites) {
			return favorites.find((p) => p.id === id);
		}
		return false;
	};

	const handleAddCart = (item) => {
		dispatch(actions.addCart(item));
	};

	const doRemoveFromCart = ({ id }) => {
		dispatch(actions.removeCart(id));
	};

	return (
		<div className="App" style={{ display: 'flex' }}>
			<h1>Destaques</h1>
			<div
				style={{
					width: 350,
					height: 300,
					backgroundColor: '#c4c4c4',
					display: 'flex',
					justifyContent: 'center',
					alignSelf: 'center'
				}}
			>
				<ul style={{ display: 'flex' }}>
					{products &&
						products.map((product) => {
							return (
								<li key={product.id} style={{ display: 'inline' }}>
									<div
										style={{
											backgroundColor: '#eaeaea',
											width: 120,
											height: 140,
											margin: 10,
											flex: 1,
											padding: 4,
											display: 'flex',
											flexDirection: 'column'
										}}
									>
										<span
											style={{
												textAlign: 'center',
												fontSize: 10,
												fontWeight: 'bold',
												textTransform: 'uppercase',
												flex: 0.8
											}}
										>
											{product.name}
										</span>
										<div
											style={{
												flex: 0.2,
												display: 'flex',
												justifyContent: 'space-between',
												flexDirection: 'row'
											}}
										>
											<button
												style={{
													border: 0,
													borderRadius: 4,
													backgroundColor: '#d4d4d4',
													width: 50
												}}
												onClick={() => handleAddCart(product)}
											>
												<MdAddShoppingCart />
											</button>
											<button
												style={{
													backgroundColor: '#d4d4d4',
													border: 0,
													borderRadius: 4,
													width: 50
												}}
												onClick={() => handleAddFavorite(product)}
											>
												{!hasBeenFavorite(product) ? <FiHeart /> : <FaHeart />}
											</button>
										</div>
									</div>
								</li>
							);
						})}
				</ul>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					flex: 1,
					justifyContent: 'center',
					alignSelf: 'center'
				}}
			>
				<h2>Checkout {`Total: ${cartItems.total}`}</h2>
				<ul style={{ display: 'flex', flexDirection: 'column' }}>
					{cartItems.products.map((item) => {
						return (
							<li
								key={item.id}
								style={{ margin: 8, padding: 10, backgroundColor: '#d4d4d4' }}
							>
								{item.name}
								<span style={{ margin: 8 }}>{item.price}</span>
								<span style={{ margin: 8 }}>{item.quantity}</span>
								<button
									style={{
										borderWidth: 1,
										borderRight: 0,
										borderBottom: 0,
										borderTop: 0,
										marginLeft: 10,
										paddingLeft: 10,
										backgroundColor: '#d4d4d4'
									}}
									onClick={() => doRemoveFromCart(item)}
								>
									<CgRemove />
								</button>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
};

export default ShoppingApp;
