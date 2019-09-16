<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start">
      </div>
      <div class="desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div v-for="(item,index) in detailInfo.detailImage" :key="index">
      <div class="info-key">{{item.key}}</div>
      <div class="info-list">
        <img v-for="(item, index) in item.list" :key="index" :src="item" @load="imgLoad" />
      </div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailImagesInfo",
    props: {
      detailInfo: {
        type: Object
      }
    },
    data() {
			return {
				counter: 0,
        imagesLength: 0
      }
    },
    methods: {
	    imgLoad() {
        // imgLoad函数监控图片加载个数。
        // 判断一下, 所有的图片都加载完了, 在进行一次回调就可以了,避免多次发送自定义事件
        this.counter += 1
        if (this.counter === this.imagesLength) {
          this.$emit('imageLoad');
        }
	    }
    },
    watch: {
      //watch监控detailInfo属性值的变化
	    detailInfo() {
	      // 获取图片的个数
	    	this.imagesLength = this.detailInfo.detailImage[0].list.length
	    }
    }
	}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
  }

  .info-desc {
    padding: 0 15px;
  }

  .info-desc .start, .info-desc .end {
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
    position: relative;
  }

  .info-desc .start {
    float: left;
  }

  .info-desc .end {
    float: right;
  }

  .info-desc .start::before, .info-desc .end::after {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: #333;
    bottom: 0;
  }

  .info-desc .end::after {
    right: 0;
  }

  .info-desc .desc {
    padding: 15px 0;
    font-size: 14px;
  }

  .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }

  .info-list img {
    width: 100%;
  }
</style>
