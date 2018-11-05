<template>
<div class="zheye-card">
      <swiper ref="cardSwiper" :options="swiperOption" style="height:100%;">
        <swiper-slide :span="24">
          <el-row :gutter="20">
            <el-col class="web-card" >
              <div style="padding-right:20px">
                 <!-- 搜索、公告 -->
                <template>
                  <div class="zheye-card-hd">
                    <z-search></z-search>
                    <el-alert
                      title="折页测试版本0.0.1，新增快速导航链接功能！"
                      type="info"
                      :closable='false'
                      show-icon>
                    </el-alert>
                  </div>
                  <div style="height:20px;"></div>
                </template>
                <!-- 历史记录 -->
                <z-history v-if="historyCount"></z-history>
                <!-- 推荐 -->
                <z-recommend></z-recommend>
              </div>
            </el-col>
          </el-row>
        </swiper-slide>
        <swiper-slide :span="24" v-for="(cate,cindex) in cateList" :key="cindex">
          <el-row :gutter="20">
            <el-col class="web-card" >
              <div style="padding-right:20px">
                
                <!-- 所有网址 -->
                <el-card >
                  <div slot="header" class="clearfix">
                    <span class="web-card-title">{{cate.title}}</span>
                  </div>
                  <el-row :gutter="20" v-if="cateList">
                    <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" v-for="(list,index) in cate.list" :key="index">
                      
                      <a @click="gotoLink(list)" class="web-card-item">
                        <img class="web-card-item-thumb" v-lazy="list.thumb" alt="" srcset="">      
                        <div class="web-card-item-info">
                          <h5 class="web-card-item-info-title">{{list.title}}</h5>
                          <p class="web-card-item-info-desc">{{list.desc}}</p>
                        </div>
                        <i class="web-card-item-arrow el-icon-arrow-right"></i>
                      </a>
                    </el-col>
                  </el-row>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </swiper-slide>
        <div class="swiper-scrollbar" slot="scrollbar"></div>
      </swiper>
      <!-- 右侧浮动组件 -->
      <z-fixed></z-fixed>
      
  </div>  
</template>

<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ZSearch from './Search.vue'
import ZHistory from './History.vue'
import ZRecommend from './Recommend.vue'
import ZFixed from './Fixed'
import {mapState} from 'vuex'
// import { getList, getCate } from '@/api/zheye'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'Card',
  data () {
    return {
      currentCate: [],
      currentList: [],
      cateList: [],
      arr: [],
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        spaceBetween: 0,
        freeMode: true,
        observer: true,
        observeParents: true,
        scrollbar: {
          el: '.swiper-scrollbar',
          hide: true
        },
        autoHeight: true,
        mousewheel: true
      }

    }
  },
  watch: {
    conIndex (val) {
      this.conScrollTo(val)
      // this.$refs.cardSwiper.swiper.slideTo(val, 500, false)
    },
    domUpdate (val) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.cardSwiper.update()
        }, 2000)
      })
    },
    cate (val) {
      this.currentCate = val
    },
    list (val) {
      this.currentList = val
    }
  },
  computed: {
    ...mapState(
      {
        historyCount: state => state.Zheye.historyCount,
        cate: state => state.Zheye.cate,
        list: state => state.Zheye.zheye,
        conIndex: state => state.Zheye.conIndex,
        domUpdate: state => state.Zheye.domUpdate
      }

    )
  },
  async created () {
    try {
      // 获取历史记录总数
      await this.$store.dispatch('getHistoryCount')
      // 获取分类

      await this.$store.dispatch('getCategory')
      await this.$store.dispatch('getAllZheye')
      this.getCateList()
    } catch (error) {
      this.$message.error('获取数据出错了~……~ ！！！ 请联系客服解决问题')
    }
  },
  mounted () {
    this.onScrollEnd()
  },
  methods: {
    // 组合数据
    getCateList () {
      let that = this
      let arr = []
      // this.cateList
      let cateList = []
      this.currentCate.forEach((mcate, index) => {
        arr[index] = []
        that.currentList.forEach(list => {
          if (list.cate_id === mcate._id) {
            arr[index].push(list)
          }
        })
        mcate.list = arr[index]
        cateList.push(mcate)
      })
      this.cateList = cateList
    },
    // 跳转链接，并保存更新历史记录排序
    async gotoLink (item) {
      this.$electron.shell.openExternal(item.link)
      await this.$store.dispatch('saveHistory', item)
    },
    // 监听触摸滚动结束，是第几个slider
    onScrollEnd () {
      var that = this
      setTimeout(() => {
        // this.$refs.cardSwiper.swiper.on('transitionEnd', function () {
        // that.$store.commit('SET_SIDE_INDEX', this.activeIndex)
        // })
        // 鼠标滚轮，拖拽都可以触发slideChange
        this.$refs.cardSwiper.swiper.on('slideChange', function () {
          that.$store.commit('SET_SIDE_INDEX', this.activeIndex)
        })
      }, 1000)
    },
    conScrollTo (val = 0) {
      this.$refs.cardSwiper.swiper.slideTo(val, 500, false)
    }

  },
  components: {
    ZSearch,
    ZHistory,
    ZRecommend,
    ZFixed,
    swiper,
    swiperSlide
  }
}
</script>

<style lang="less">
.zheye-card {
  height: 100%;
  width: 100%;
  &-hd{
    box-shadow:0 5px 15px rgba(126,34,137,0.08);
    .el-alert{
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      background: #fffae8;
      color: #fb6743;
    }
  }
  .swiper-slide{
    height: auto;
  }
  .swiper-scrollbar-drag{
      background: rgba(0,0,0,0.1)
    } 
}
.web-card {
  margin-top: 20px;

  .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
    box-shadow:0 0 15px rgba(126,34,137,0.08);
  }
  .el-card__body {
    padding: 20px 20px 0px;
  }
  .el-card__header{
    padding: 16px 20px;
    border-bottom:1px solid #fcfcfc;
  }
  &-title {
    position: relative;
    display: inline-block;
    font-size: 12px;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      height: 2px;
      bottom: -19px;
      background: #75777d;
    }
  }
  &-item {
    position: relative;
    padding: 15px 40px 15px 15px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    text-decoration: none;
    background: #fafafa;
    margin-bottom: 20px;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background: #f1f2f9;
      box-shadow:0 0 15px rgba(126,34,137,0.08);
    }
    &-thumb {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      margin-right: 10px;
    }
    &-info {
      flex: 1;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 1;
      &-title {
        padding: 0;
        margin: 0;
        font-size: 14px;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &-desc {
        padding: 0;
        margin: 0;
        padding-top: 5px;
        font-size: 12px;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    &-arrow {
      position: absolute;
      right: 15px;
      top: 50%;
      margin-top: -10px;
      color: #333;
    }
  }
}
</style>
