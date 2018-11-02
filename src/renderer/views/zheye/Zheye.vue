<template>
    <div class="page-zheye">
      <!-- 头部组件 -->
      <z-header></z-header>
      <div class="page-zheye-container" :style="{height:iHeight+'px'}">
        <!-- 侧边栏 -->
        <z-side></z-side>
        <!-- 内容 -->
        <div :style="{width:contentWidth+'px',height:'100%'}">
          <z-card></z-card>
        </div>
      </div>
     
    </div>
</template>

<script>
import ZHeader from './components/Header'
import ZSide from './components/Side'
import ZCard from './components/Card'

export default {
  name: 'Zheye',
  data () {
    return {
      iHeight: 0,
      contentWidth: 950,
      currentIndex: 0
    }
  },
  async created () {
    // 获取分类
    await this.$store.dispatch('getCategory')
  },
  mounted () {
    var that = this
    this.setHeight()
    this.setContentHeight()
    window.addEventListener('resize', function () {
      that.setHeight()
      that.setContentHeight()
    })
  },
  beforeDestroy () {
    var that = this
    window.removeEventListener('resize', function () {
      that.setHeight()
      that.setContentHeight()
    })
  },
  methods: {

    setHeight () {
      this.iHeight = document.documentElement.clientHeight - 52
    },
    setContentHeight () {
      this.contentWidth = document.documentElement.clientWidth - 250
    }
  },
  components: {
    ZHeader,
    ZSide,
    ZCard

  }
}
</script>

<style lang="less">
.page-zheye{
  height: 100%;
  overflow: hidden;
    &-container{
      background: #f6f6f6;
      display: flex;
      flex-direction: row;
      overflow: hidden;
    }
}
</style>
