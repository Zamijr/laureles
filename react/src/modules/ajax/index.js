import initialState from './initialState';

const BEGIN_AJAX_CALL = 'BEGIN_AJAX_CALL';
const AJAX_CALL_ERROR = 'AJAX_CALL_ERROR';

function actionTypeEndsInSuccess(type) {
	return type.substring(type.length - 8) === '_SUCCESS';
}

export default (state = initialState, action) => {
	if (action.type === BEGIN_AJAX_CALL) {
		return state + 1;
	} else if (action.type === AJAX_CALL_ERROR || actionTypeEndsInSuccess(action.type)) {
		return state - 1;
	}
	return state;
};

export const beginAjaxCall = () => {
	return {type: BEGIN_AJAX_CALL};
};

export const ajaxCallError = () => {
	return {type: AJAX_CALL_ERROR};
};
