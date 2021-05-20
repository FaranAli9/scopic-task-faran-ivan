import moment from 'moment';
import Vue from 'vue';

// "async" is optional
export default async ({ /* app, router, Vue, ... */}) => {
    Vue.prototype.$moment = moment;


    Vue.filter('date', function (value) {

        return moment(value).format('DD MMM, YYYY');
    });

    Vue.filter('dateTime', function (value) {

        return moment(value).format('DD-MMM-YYYY hh:mma');
    });

    Vue.filter('diff', function (value) {

        return moment(value).from();
    });


    // Should be in a filters boot file
    Vue.filter('price', function (value) {

        return `$${parseFloat(value).toFixed(2)}`;
    });


}
