import store from 'src/store'

const except = ['login','register','forgot-password','password-reset'];
export default async (to, from, next) => {
    if (!store.getters['auth/check']) {
        return except.indexOf(to.name) > -1 ? next() : next({name: 'login'});
    }
    else {
        next()
    }
}


