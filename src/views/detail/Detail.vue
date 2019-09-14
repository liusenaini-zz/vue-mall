<template>
    <div>
        <detail-nav-bar/>
    </div>
</template>

<script>
import DetailNavBar from 'views/detail/chilComps/DetailNavBar.vue'
    export default {
        data(){
            return{
                iid:null,
            }
        },
        components:{
            DetailNavBar
        },
        created(){
            this.iid = this.$route.params.iid//接收GoodsListlitem组件传递过来的iid
        }
    }
</script>

<style scoped>

</style>