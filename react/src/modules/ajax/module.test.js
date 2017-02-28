import {expect} from 'chai';
import initialState from './initialState';
import ajaxModule, {beginAjaxCall, ajaxCallError} from './index';

describe('Reducer llamadas Ajax', () => {
	it('BEGIN_AJAX_CALL: Debe aumentar el número de llamadas ajax', () => {
		const action = beginAjaxCall();
		let newState = ajaxModule(initialState.ajaxCallsInProgress, action);
		expect(newState).to.equal(1);
	});

	it('AJAX_CALL_ERROR: Debe disminuir el número de llamadas ajax cuando hay un error', () => {
		const actionBegin = beginAjaxCall();
		const actionError = ajaxCallError();
		let newState = ajaxModule(initialState.ajaxCallsInProgress, actionBegin);
		newState = ajaxModule(newState, actionError);
		expect(newState).to.equal(0);
	});
});
