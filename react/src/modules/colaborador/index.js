import initialState from './initialState';
import Immutable from 'immutable';
import _ from 'lodash';

const INIT_CANDIDATE = 'INIT_CANDIDATE'; 

export default function reducer(state = initialState, action) {
	switch (action.type) {
	case INIT_CANDIDATE: {
		return state.set('Candidate', initialState);
	} 
	default: return state; 
	}
}

export const init = () => {
	return (dispatch) => { 
		
		dispatch({type: INIT_CANDIDATE});
		
	};
};
