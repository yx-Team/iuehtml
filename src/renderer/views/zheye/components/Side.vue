<template>
    <div class="zheye-side">
      <swiper style="height:100%" :options="swiperOption">
        <swiper-slide class="zheye-side-slide">
          <ul>
            <li class="zheye-side-item"
              :class="{'is-active':index===cindex}"
              v-for="(item,index) in cate"
              :key="index"
              @click="handle(index)"
              >
              <span>{{item.title}}</span>
              </li>
          </ul>
        </swiper-slide>
        <!-- <div class="swiper-scrollbar" slot="scrollbar"></div> -->
      </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import { getCate } from '@/api/zheye'
import {mapState} from 'vuex'
export default {
  name: 'Side',
  data () {
    return {
      // cate: [],
      cindex: 0,
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
  computed: {
    ...mapState(
      {cate: state => state.Zheye.cate}
    )
  },
  // async created () {
  //   const cate = await getCate()
  //   if (cate.data.success) {
  //     this.cate = cate.data.data
  //   }
  // },
  methods: {
    handle (index) {
      this.cindex = index
      this.$emit('click', index)
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
