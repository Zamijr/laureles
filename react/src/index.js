
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store';
import {Provider} from 'react-redux';
import Router from './router';
import {initApp} from './modules/home';
import sass from '../sass/main.scss';

const store = configureStore();

let datosIniciales = {
	email: document.querySelector('[name="email"]').value,
	foto: document.querySelector('[name="foto"]').value,
	token: document.querySelector('[name="token"]').value
};

store.dispatch(initApp(datosIniciales));

document.querySelector('#inicial').remove();

render(
	<Provider store={store}>
		<Router/>
	</Provider>,
	document.getElementById('app')
);
