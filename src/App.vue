<template>
    <div id="q-app">
        <component :is="layouts[layout]"></component>
    </div>
</template>

<script>
const requireContext = require.context('layouts', false, /.*\.vue$/);

import {mapState} from 'vuex';

export default {
    name: 'App',

    async created() {
        this.getLayouts();

        // await this.$axios.get(this.route('debugbar.inject'))
        //     .then((response) => {
        //         let parser = new DOMParser();
        //         let dom = parser.parseFromString(response.data, 'text/html');
        //
        //         let scripts = [].slice.call(dom.getElementsByTagName('script'));
        //         this.addScripts(scripts);
        //
        //         let styles = [].slice.call(dom.getElementsByTagName('link'));
        //         styles.forEach((style) => {
        //             document.head.innerHTML += style.outerHTML;
        //         })
        //     })
    },
    data() {
        return {
            layouts: []
        }
    },

    computed: {


        ...mapState({
            layout: state => state.ui.layout
        }),


    },

    methods: {
        getLayouts() {
            this.layouts = requireContext.keys()
                .map(file =>
                    [file.replace(/(^.\/)|(\.vue$)/g, ''), requireContext(file)]
                )
                .reduce((components, [name, component]) => {
                    components[name] = component.default;
                    return components;
                }, {});
        },

        addScripts(scripts) {
            scripts.forEach((script, index) => {
                if (script.innerHTML === 'jQuery.noConflict(true);')
                    return;
                let div = document.createElement('div');
                let s = document.createElement('script');
                s.innerHTML = script.innerHTML;
                script.src ? s.src = script.src : null;
                div.appendChild(s);
                if (!script.src)
                    setTimeout(() => {
                        document.getElementById('dbb').appendChild(div);

                    }, 1000);
                else {
                    document.getElementById('dbb').appendChild(div);

                }
            })
        }
    }
}
</script>
