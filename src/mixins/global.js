const url = require("url");

export default {
    methods: {
        route(name, params) {
            let route = this.$store.state.routes.list[name];
            let uri = route.uri;

            try {
                let str = uri.match(/{.+?}/g);
                if (str) {
                    str = str.map(function (x) {
                        return x.slice(1, -1);
                    });
                    for (let v of str) {
                        uri = uri.replace("{" + v + "}", params[v]);
                    }
                }
            } catch (err) {
                console.error("Route does not exist",uri);
            }

            let host = process.env.API_SERVER;
            uri = url.resolve(host, uri);
            return uri;
        },
        hasPermission(permission) {
            return this.$store.getters["auth/hasPermission"](permission);
        },
        hasRole(role) {
            return this.$store.getters["auth/hasRole"](role);
        },
    },
};
