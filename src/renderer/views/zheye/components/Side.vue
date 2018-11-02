<template>
    <div class="zheye-side">
      <swiper style="height:100%" ref="sideSwiper" :options="swiperOption">
        <!-- <swiper-slide class="zheye-side-slide">
          <ul>
            <li class="zheye-side-item"
              :class="{'is-active':cindex===0}"
              @click="handle(0)"
              >
              <span>每日推荐</span>
              </li>
            <li class="zheye-side-item"
              :class="{'is-active':(index+1)===cindex}"
              v-for="(item,index) in cate"
              :key="index"
              @click="handle(index+1)"
              >
              <span>{{item.title}}</span>
              </li>
          </ul>
        </swiper-slide> -->
        <swiper-slide 
          class="zheye-side-item"
          :class="{'is-active':cindex===0}"
          
        >
         <span @click="handle(0)">每日推荐</span>
        </swiper-slide>
        <swiper-slide 
            class="zheye-side-item"
            :class="{'is-active':(index+1)===cindex}"
            v-for="(item,index) in cate"
            :key="index+1"
        >
          <span @click="handle(index+1)">{{item.title}}</span>
        </swiper-slide>
          
        <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
      </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import {mapState} from 'vuex'
export default {
  name: 'Side',
  data () {
    return {
      // cate: [],
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        observer: true,
        observeParents: true,
        mousewheel: true
      }
    }
  },
  watch: {
    cindex (val) {
      this.$refs.sideSwiper.swiper.slideTo(val, 500, false)
    }
  },
  computed: {
    ...mapState(
      {
        cate: state => state.Zheye.cate,
        cindex: state => state.Zheye.sideIndex
      }
    )
  },
  methods: {
    handle (index) {
      this.$store.commit('SET_SIDE_INDEX', index)
      this.$store.commit('SET_CON_INDEX', index)
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="less">
.zheye {
  &-side {
    width: 250px;
    height: 100%;
    overflow: hidden;
    padding-top: 17px;
    box-sizing: border-box;
    &-item {
      position: relative;
      height: 50px;
      line-height: 50px;
      font-size: 14px;
      cursor: pointer;
      span {
        display: block;
        height: 50px;
        padding-left: 82px;
        box-sizing: border-box;
        color: #a79894;
        text-decoration: none;
      }
      &.is-active {
        &:after {
          content: "";
          position: absolute;
          left: 50px;
          top: 50%;
          margin-top: -5px;
          height: 10px;
          width: 3px;
          background: #333333;
        }
        span {
          color: #333;
        }
      }
    }
    &-slide{
      height: auto;
    }
    .swiper-scrollbar-drag{
      background: rgba(0,0,0,0.1)
    }
  }
}
</style>
