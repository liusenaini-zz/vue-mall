<template>
    <div class="goods">
      <goods-list-item v-for="(item,index) in goods" :key="index" :goodsitem='item'/>
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
    export default {
        props:{
          goods:{
              type:Array,
              default(){
                  return []
              }
          }
        },
        components:{
            GoodsListItem
        }
    }
</script>

<style scoped>
 .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 2px;
  }

</style>