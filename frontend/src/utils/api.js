import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const api = axios.create({
  baseURL: BASE_URL,
});

export const addToCart = (watchId, token) =>
  api.post('/cart/add', { watchId }, { headers: { authorization: token } });

export const getCart = (token) =>
  api.get('/cart', { headers: { authorization: token } });

export const getCartCount = (token) =>
  api.get('/cart/count', { headers: { authorization: token } });

export const removeFromCart = (watchId, token) =>
  api.post('/cart/remove', { watchId }, { headers: { authorization: token } });

export const updateCartItem = (watchId, quantity, token) =>
  api.post('/cart/update', { watchId, quantity }, { headers: { authorization: token } });

export const clearCart = (token) =>
  api.post('/cart/clear', {}, { headers: { authorization: token } });