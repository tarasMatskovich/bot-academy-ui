import axios from 'axios'
import store from "@/store";

let client = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:8001/api/v1',
    headers: {
        'Access-Control-Allow-Origin' : 'http://localhost:8001',
    }
})

client.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
});

client.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    let dontRefresh = [
        'users/sign-in',
        'users/sign-up',
    ]
    if (error.response.status === 401 && !dontRefresh.includes(originalRequest.url)) {
        await store.dispatch('users/forceLogout')
        return Promise.reject(error);
    }

    if (error.response.status === 401) {
        await store.dispatch('errors/addError', 'Invalid credentials')
    } else {
        error.response.data.errors.map((responseError) => {
            store.dispatch('errors/addError', responseError.detail)
        })
    }
    return Promise.reject(error);
});

export default client;
