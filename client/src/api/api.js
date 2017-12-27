import apiConfig from './config';
import { showMessageByCod } from '../message-log/index'

export const handleErrors = (response) => {

	return new Promise((resolve, reject) => {
		if (response.ok && response.status === 200) {
			response.json().then((response) => {
				console.log(response, response.cod)
				if (response && response.cod) {
					showMessageByCod(response.cod)
				}
				resolve(response);
			}).catch((e) => {
				showMessageByCod('ERROR_DEFAULT')
				reject(e);
			})
		} else {
			response.json().then((response) => {
				if (response && response.cod) {
					showMessageByCod(response.cod)
				}
				reject(response);
			}).catch((e) => {
				reject(e);
			})
		}
	})
}

const fetchApi = (endPoint, payload = {}, method = 'get', pHeaders = {}) => {

	let headers = new Headers(pHeaders);

	//const accessToken = store.getState().session.jwt;

	//if (accessToken) {
	//    headers.append("x-auth", accessToken);
	//}

	let params = {
		method: method.toLowerCase(),
		headers: headers,
	};

	if (payload)
		params.body = JSON.stringify(payload)

	const request = new Request(`${apiConfig.url}${endPoint}`, params);

	return fetch(request).then(handleErrors);
}

export default fetchApi;