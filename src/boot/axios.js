import Vue from 'vue'
import axios from 'axios'
import objectToFormData from 'src/utils/objectToFormData'
import store from 'src/store'
import router from 'src/router';


Vue.prototype.$axios = axios;
const vue = new Vue();


axios.interceptors.request.use(request => {

    request.transformRequest = (data) => {
        if (request.method === 'patch') {
            data = {...data, _method: 'patch'};
            request.method = 'post';
        }
        return objectToFormData(data);
    };
    const token = store.getters['auth/token'];

    axios.defaults.withCredentials = true;

    if (token) {
        request.headers.common['Authorization'] = `Bearer ${token}`
    }

    const locale = store.getters['lang/locale'];
    if (locale) {
        request.headers.common['Accept-Language'] = locale
    }

    request.headers.common['Content-Type'] = undefined;
    request.headers.common['Accept'] = 'application/json';

    return request
});


axios.interceptors.response.use(
    response => {
        return Promise.resolve(response)
    },
    error => {
        switch (error.response.status) {
            case 422:

                setTimeout(() => {
                    let errorContainer = document.getElementsByClassName('q-field--error');
                    if (errorContainer.length)
                        errorContainer[0].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
                }, 200);
                break;

            case 404:
                store.commit('ui/setServerError', {status: 404, component: 'error-404'});
                break;

            case 401:
                store.commit('auth/clearUser');
                vue.$toasted.info('Please login again');
                router.push({name: 'login'});
                break;
            case 500:
                const message = process.env.DEV ? error.response.data.message : 'Server error';
                const duration = process.env.DEV ? 20000 : 3000;
                vue.$toasted.error(message, {duration});
        }
        return Promise.reject(error)
    });
