import fetchApi from '../../../../api/api';

const endPoints = {
    login: '/account/login'
};

export const login = (credentials) => {
    return fetchApi(endPoints.login, credentials, 'post', { "Content-Type": "application/json" });
};

const api = {
    login
}

export default api
