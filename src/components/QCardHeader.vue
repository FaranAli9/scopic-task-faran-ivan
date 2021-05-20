<template>
    <div>
        <q-card-section class="bg-primary text-white">
            <div class="back-btn-wrapper" v-if="back">
                <q-btn class="q-mr-sm" :to="back" color="dark-grey" ><q-icon name="mdi-arrow-left"></q-icon></q-btn>
            </div>
            <component v-if="raw===false" :component="tag" :is="tag" class="q-my-none text-weight-light" :class="`text-${align}`">
                <slot></slot>
            </component>
            <slot v-else></slot>
            <div class="actions-wrapper" v-if="$scopedSlots.actions">
                <slot name="actions">
                </slot>

            </div>

        </q-card-section>
        <q-separator></q-separator>
    </div>
</template>

<script>
export default {
    name: 'q-card-header',
    data() {
        return {}
    },

    props: {
        tag: {
            required: false,
            default: 'h3'
        },
        align: {
            required: false,
            default: 'center'
        },
        raw: {
            required: false,
            default: false
        },
        back: {
            required: false,
            type: Object,
        }
    }
}
</script>
