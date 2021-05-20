<template>
    <div>
        <div class="row q-col-gutter-md q-mb-sm relative-position" v-for="(pair,index) in inputs.pairs" :key="index">
            <div class="col-12 col-sm-5">
                <q-input
                    label="Value of x"
                    type="number"
                    v-model="inputs.pairs[index].x"
                    filled
                >
                    <template v-slot:before>
                        <span class="input-before-symbol --width-15 font-0-75-rem">x<sub>{{ index }}</sub></span>
                    </template>
                </q-input>
            </div>

            <div class="col-12 col-sm-5">
                <q-input
                    label="Value of y"
                    type="number"
                    v-model="inputs.pairs[index].y"
                    filled
                >
                    <template v-slot:before>
                        <span class="input-before-symbol --width-15 font-0-75-rem">y<sub>{{ index }}</sub></span>
                    </template>
                </q-input>
            </div>

            <div class="col-12 col-sm-2">
                <div class="flex full-height items-center">
                    <q-btn icon="close" round color="negative" size="xs" @click="removePair(index)"></q-btn>
                </div>
            </div>
        </div>

        <q-btn color="positive" @click="addPair" class="q-ml-lg">Add pair</q-btn>

    </div>
</template>

<script>
export default {
    name: "x-y-pairs",
    props: {
        value: {
            required: true,
            type: Object
        }
    },
    data(){
        return {
            inputs: {
                pairs: [{x: null, y: null}, {x: null, y: null},{x: null, y: null}]
            }
        }
    },
    watch: {
        inputs: {
            handler: function () {
                this.emit();
            },
            deep: true
        }
    },
    methods: {
        addPair() {
            if (this.inputs.pairs.length<50)
                this.inputs.pairs.push({x: null, y: null});
            else
                this.$toasted.info('Maximum xy-pairs added')
        },
        removePair(index) {
            if (this.inputs.pairs.length>3)
                this.inputs.pairs.splice(index, 1);
            else
                this.$toasted.info('Minimum of 3 xy-pairs required.')
        },
        emit() {
            this.$emit('input', this.inputs);
        },
    }
}
</script>

<style scoped>

</style>
