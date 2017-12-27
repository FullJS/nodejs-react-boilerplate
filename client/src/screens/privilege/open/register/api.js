import fetchApi from '../../../../api/api';

const account = {
	create: '/account/',
};

export const create = (newAccount) => {
	return fetchApi(account.create, newAccount, 'post', { "Content-Type": "application/json" });
};

const api = {
  create
}

export default api;