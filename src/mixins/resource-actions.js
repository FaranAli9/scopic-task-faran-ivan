export default {

    data() {
        return {
            deleteDialog: {
                title: 'Confirm',
                message: 'Are you sure you want to delete this item?',
                ok: 'Confirm',
            },
        }
    },

    methods: {
        confirmDeletion() {
            this.$q
                .dialog({
                    title: this.deleteDialog.title,
                    message: this.deleteDialog.message,
                    cancel: true,
                    persistent: true,
                    ok: {
                        label:this.deleteDialog.ok,
                        color:'negative',
                        class:'q-px-sm'
                    },
                })
                .onOk(this._destroy);

        },
        _destroy() {
            this.$axios.delete(this.endpoints.destroy)
                .then(() => {
                    this.$toasted.success('Item deleted');
                    this.$emit('destroyed');
                })
                .catch(() => {
                })
            ;
        },
    }
}