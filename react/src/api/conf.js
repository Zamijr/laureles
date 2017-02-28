export const urlGrapqhl = 'http://localhost:8000/graphql';

export const getHeaders = (token) => {
	return  {
		headers: {
			'Authorization': token,
			'Content-Type': 'application/json'
		}
	};
};
