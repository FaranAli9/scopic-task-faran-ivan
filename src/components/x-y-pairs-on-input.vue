<template>
    <div>
        <div class="q-mb-lg">
            <q-input
                outlined
                label="Number of x-y pairs (limit: 50)"
                type="number"
                @input="onValueChange"
                :debounce="5"
                v-model="inputs.x"
                :error="error.flag"
                :error-message="error.message"
            ></q-input>
        </div>
        <div>
            <q-separator class="q-my-lg"></q-separator>
            <div class="row q-col-gutter-md q-mb-sm relative-position" v-for="(pair,index) in inputs.pairs" :key="index">
                <div class="col-12 col-sm-6">
                    <q-input

                        type="number"
                        v-model="inputs.pairs[index].x"
                        outlined
                        :prefix="'x'+(index+1)"

                    >
                    </q-input>
                </div>

                <div class="col-12 col-sm-6">
                    <q-input
                        type="number"
                        v-model="inputs.pairs[index].y"
                        outlined
                        :prefix="'y'+(index+1)"


                    >
                    </q-input>
                </div>

            </div>


        </div>
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
    data() {
        return {
            inputs: {
                x: null,
                pairs: null
            },
            error: {
                flag: false,
                message: null
            }
        };
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
        onValueChange(value) {


            if (value > 2 && value <= 50) {
                let array = [];
                for (let i = 0; i <= value; i++) {
                    array.push({x: null, y: null})
                }
                this.inputs.pairs = array
            }


            if (value >= 0 && value < 3) {
                this.error.flag = true
                this.error.message = 'Minimum of 3 xy-pairs required.';
            }
            else {
                this.error.flag = false
            }

        },
        emit() {
            this.$emit('input', this.inputs);
        },
    }
}
</script>

<style scoped>

</style>
