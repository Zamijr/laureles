/**
 * @module Catalogos
 */
import {post} from 'axios';
import {urlGrapqhl, getHeaders} from '../conf';
/**
 * Las peticiones a Graphql del modulo EntregaLaurel.
 * @class CatalogosApi
 */
export default class CatalogosApi {
  
  static listarValores(token) {
    return post(urlGrapqhl, {
      query: "{getValores{_id clave descripcion}}",
      variables: null,
      operationName: null
    }, getHeaders(token));
  }

  static agregarValor(valorObj,token) {
    let datos = JSON.stringify(valorObj).replace(/"(\w+)"\s*:/g, '$1:');
    return post(urlGrapqhl, {
      query: `mutation{nuevoValor(valor: ${datos}){_id clave descripcion}}`,
      variables: null,
      operationName: null
    }, getHeaders(token));
  }

  static borrarValor(idValor,token) {
    return post(urlGrapqhl, {
      query: `mutation{deshabilitarValor(idValor:"${idValor}"){_id clave descripcion}}`,
      variables: null,
      operationName: null
    }, getHeaders(token));
  }

  static editarValor(idValor,valorObj,token) {
    let datos = JSON.stringify(valorObj).replace(/"(\w+)"\s*:/g, '$1:');
    return post(urlGrapqhl, {
      query: `mutation{modificarValor(idValor:"${idValor}",datos:${datos}){_id clave descripcion}}`,
      variables: null,
      operationName: null
    }, getHeaders(token));
  }

  static listarPremios(token) {
    return post(urlGrapqhl, {
      query: "{getPremios{_id clave tipo costo}}",
      variables: null,
      operationName: null
    }, getHeaders(token));
  }

  static agregarPremio(premioObj,token) {
    let datos = JSON.stringify(premioObj).replace(/"(\w+)"\s*:/g, '$1:');
    return post(urlGrapqhl, {
      query: `mutation{nuevoPremio(premio: ${datos}){_id clave tipo costo}}`,
      variables: null,
      operationName: null
    }, getHeaders(token));
  }

  static borrarPremio(idPremio,token) {
    return post(urlGrapqhl, {
      query: `mutation{deshabilitarPremio(idPremio: "${idPremio}"){_id clave tipo costo}}`,
      variables: null,
      operationName: null
    }, getHeaders(token));
  }

  static editarPremio(idPremio,premioObj,token) {
    let datos = JSON.stringify(premioObj).replace(/"(\w+)"\s*:/g, '$1:');
    return post(urlGrapqhl, {
      query: `mutation{modificarPremio(idPremio: "${idPremio}",datos: ${datos}){_id clave tipo costo}}`,
      variables: null,
      operationName: null
    }, getHeaders(token));
  }

}
