<template>
    <div class="fixed-tool">
        <a class="fixed-tool-btn" @click="handleTop"><i class="iconfont icon-huidaodingbu"></i></a>
    </div>
</template>

<script>
export default {
  name: 'Fixed',

  methods: {
    handleTop () {
      if (this.$store.state.Zheye.conIndex === 0) {
        this.$parent.conScrollTo()
      }
      this.$store.commit('SET_CON_INDEX', 0)
      this.$store.commit('SET_SIDE_INDEX', 0)
    }
  }
}
</script>

<style lang="less">
.fixed-tool {
  position: fixed;
  right: 10px;
  bottom: 50px;
  z-index: 999;
  &-btn{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #6175e8;
      color: #fff;
      font-size: 28px;
      transition: all .3s;
      cursor: pointer;
      &:hover{
        color: #fff;
        box-shadow:0 5px 15px rgba(126,34,137,0.3);
      }
  }
}
</style>
