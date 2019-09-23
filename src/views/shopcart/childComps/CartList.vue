<template>
  <div>
    <cart-list-item  v-for="(item,index) in cartitem" :key="index" :itemInfo="item" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CartListItem from "./CartListItem.vue";
export default {
  computed: {
    ...mapGetters(["cartitem"])
  },
  components: {
    CartListItem
  },
};
</script>

<style scoped>

</style>