<template>
    <!-- 底栏进行组件封装 -->
    <div id="tab-bar">
       <slot></slot>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
#tab-bar{
    display:flex;
    background: #f6f6f6;
    position: fixed;
    left: 0px;
    right: 0px;
    bottom:0px;
    box-shadow: 0 -1px 1px rgba(100,100,100,0.2);
    z-index: 9;
}
</style>