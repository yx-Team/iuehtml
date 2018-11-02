<template>
    <div class="zheye-header">
        <div class="zheye-logo">
            <img class="logo" src="../../../assets/images/zlogo.png" alt="" srcset="">
            <span class="version">{{version}}</span>
        </div>
        <div class="zheye-nav">
            <ul class="zheye-nav-list">
                <li class="is-active"><a href="javascript:;">网址导航</a></li>
                <!-- <li><a href="javascript:;">关于我们</a></li> -->
            </ul>
        </div>
        <div class="zheye-actionbar">
          <i class="el-icon-minus" @click="minimizeWindow"></i>
          <i class="iconfont icon-window" v-show="ismaximized" @click="changeWindow"></i>
          <i class="iconfont icon-fullscreen" v-show="!ismaximized" @click="fullscreenWindow"></i>
          <i class="el-icon-close" @click="closeWindow"></i>
        </div>
    </div>
</template>

<script>

import { remote } from 'electron'
import { setTimeout } from 'timers'
const { BrowserWindow } = remote

export default {
  name: 'Header',
  data () {
    return {
      version: require('../../../../../package.json').version,

      // 是否是在全屏状态
      ismaximized: false

    }
  },
  mounted () {
    setTimeout(() => {
      this.$nextTick(() => {
        const win = BrowserWindow.getFocusedWindow()

        if (win.isFullScreen()) {
          this.ismaximized = true
        } else {
          this.ismaximized = false
        }
      })
    }, 500)
  },
  methods: {
    minimizeWindow () {
      const win = BrowserWindow.getFocusedWindow()
      // 窗口缩小
      win.minimize()
    },
    fullscreenWindow () {
      // this.$window.maximize()
      const win = BrowserWindow.getFocusedWindow()
      win.maximize()
      this.ismaximized = true
    },
    changeWindow () {
      // this.$window.unmaximize()
      const win = BrowserWindow.getFocusedWindow()
      win.unmaximize()
      this.ismaximized = false
    },
    closeWindow () {
      const win = BrowserWindow.getFocusedWindow()
      win.close()
      // this.$confirm('确定要退出吗~v~', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   // 窗口关闭
      //   win.close()
      //   // this.$window.close()
      // }).catch(() => {

      // })
    }
  }
}
</script>

<style lang="less">
.zheye {
  
  &-header {
    display: flex;
    height: 50px;
    width: 100%;
    background-image: linear-gradient(90deg, #677ae4 0%, #536bef 100%);
    -webkit-app-region: drag;
  }
  &-logo {
    width: 250px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    .logo {
      width: 178/2px;
      height: 36/2px;
    }
    .version {
      position: relative;
      padding-left: 10px;
      top: 5px;
      color: #fff;
      font-size: 12px;
    }
  }
  &-nav {
    -webkit-app-region: no-drag;
    &-list {
      display: flex;
      li {
        text-align: center;
        margin-right: 5px;
        transition: background-color .3s;
        -webkit-app-region: no-drag;
        cursor: pointer;
        a {
          display: block;
          width: 100px;
          height: 50px;
          line-height: 50px;
          color: #fff;
          text-decoration: none;
          -webkit-app-region: no-drag;
          user-select: none;
        }
        &:hover,&.is-active {
            background-color: rgba(0, 0, 0, 0.1);
        }
      }
      
    }
  }
  &-actionbar {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 9;
    color: #fff;
     -webkit-app-region: no-drag;
    i{
      cursor: pointer;
      padding: 0 10px;
    }
  }
}
</style>
