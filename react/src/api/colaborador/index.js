/**
 * @module Colaborador
 */
import {post} from 'axios';
import {urlGrapqhl, getHeaders} from '../conf';
/**
 * Las peticiones a Graphql del modulo EntregaLaurel.
 * @class ColaboradorApi
 */
export default class ColaboradorApi {
  
//  static listarValores(token) {
  static listarColaboradores(nombre,email,token) {
    return post(urlGrapqhl, {
      query: `{buscarColaboradores(nombre:"${nombre}",email:"${email}"){_id nombre apellidos perfil}}`,
      variables: null,
      operationName: null
    }, getHeaders(token));
  //  });
  }

 static actualizaFotoColaborador(idColaborador,urlFoto,token) {
    return post(urlGrapqhl, {
      query: `mutation{actualizaFotoColaborador(idColaborador:"${idColaborador}",urlFoto:"${urlFoto}"){_id nombre apellidos perfil urlFoto}}`,
      variables: null,
      operationName: null
    }, getHeaders(token));
  }

}