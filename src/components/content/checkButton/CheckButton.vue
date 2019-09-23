<template>
    <div class="check-button" :class="{active: ischecked}" >
        <img src="~/assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
    export default {
        props:{
         ischecked:{
             type:Boolean,
             default(){
                 return false
             }
         }
        },
        data(){
            return{
              
            }
        },
        methods:{
            
        }
    }
</script>

<style scoped>
.check-button{
    position: relative;
    margin: 0 auto;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
}
.active{
    background-color: #1296db;
    border-color: #1296db;
}
</style>