import Vue from 'vue';
import Toasted from 'vue-toasted';


// "async" is optional
export default async ({ /* app, router, Vue, ... */}) => {
// you can also pass options, check options reference below
    const vue = new Vue();
    Vue.use(Toasted, {
        position:vue.$q.platform.is.mobile? "bottom-center":"bottom-right",
        duration:3000,
        action:[
            {
                icon:'close',
                onClick : (e, toastObject) => {
                    toastObject.goAway(0);
                }
            }
        ]
    });
    // Vue.prototype.$toasted.success = (message) => {
    //     vue.$toasted.show(message,{
    //         type:"success"
    //     });
    // }
}
