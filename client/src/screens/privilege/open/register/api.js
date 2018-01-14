import fetchApi from '../../../../api/api';

const endpoints = {
	create: '/account/',
};

export const create = (newAccount) => {
	return fetchApi(endpoints.create, newAccount, 'post', { "Content-Type": "application/json" });
};

const api = {
  create
}

export default api;