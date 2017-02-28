/**
 * @module Home
 */
import {post} from 'axios';
import {urlGrapqhl, getHeaders} from '../conf';
import {getBodyRegistraUsuario} from './utils';
/**
 * Las peticiones a Graphql del modulo Home.
 * @class HomeApi
 */
class HomeApi {

	static registraUsuario(email, foto, token) {
		return post(urlGrapqhl, {
			query: getBodyRegistraUsuario(email, foto),
			variables: null,
			operationName: null
		}, getHeaders(token));
	}

}

export default HomeApi;
