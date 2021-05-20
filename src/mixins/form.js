

export default {
    created(){
        this.emit();
    },

    props:{
        value:{
            required:true,
            type:Object
        }
    },

    watch:{
        form:{
            handler:function(){
                this.emit();
            },
            deep:true
        }
    },

    methods:{
        emit(){
            this.$emit('input',this.form);
        },
    }
}