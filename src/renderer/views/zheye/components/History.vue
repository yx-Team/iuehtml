<template>
    <div class="zheye-card-history">
        <swiper :options="historySwiperOption">
            <swiper-slide  class="zheye-card-history-item" v-if="index<=12"  v-for="(list,index) in history" :key="index">
              <div  @click="gotoLink(list)">
                <div class="icon" v-if="!list.thumb" :style="{'backgroundColor':colors[index%6]}">{{list.title.slice(0,1).toLocaleUpperCase()}}</div>
                <div class="icon" v-else :style="{'backgroundColor':colors[index%6]}"><img v-lazy="list.thumb" alt="" srcset=""></div>
                <h5 class="title">{{list.title}}</h5>
              </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'History',
  data () {
    return {
      history: [],
      colors: ['#498bfc', '#ff8040', '#ffde5a', '#83cc2b', '#83cc2b', '#69cffa'],
      historySwiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 30,
        freeMode: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  },
  async created () {
    let that = this
    this.$db.history.find({}).sort({sort: -1, update_time: -1}).limit(12).exec(function (err, doc) {
      if (err) console.log(err)
      that.history = doc
      that.$store.commit('SET_DOM_UPDATE')
    })
  },
  methods: {
    // 跳转链接，并保存更新历史记录排序
    async gotoLink (item) {
      this.$electron.shell.openExternal(item.link)
      await this.$store.dispatch('saveHistory', item)
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="less">
.zheye-card {
    &-history{
        background: #fff;
        border-radius: 4px;
        padding: 15px 15px;
        box-shadow:0 5px 15px rgba(126,34,137,0.08);
        margin-bottom: 20px;
        
        &-item{
        cursor: pointer;
        width: 100px;
        .icon{
            width: 70px;
            height: 70px;
            overflow: hidden;
            font-size: 30px;
            text-align: center;
            color: #fff;
            background: #f7f7f7;
            margin: 0 auto;
            border-radius: 15px;
            box-sizing: border-box;
            padding: 15px;
            box-shadow:0 5px 15px rgba(126,34,137,0.1);
            transition: all .3s;
            img{
            display: block;
            margin: 0px auto 0;
            border-radius: 20px;
            
            width: 100%;
            height: 100%;
            
            }
            
        }
        &:hover{
            .icon{
                box-shadow:0 5px 15px rgba(126,34,137,0.3);
            }
            }
        .title{
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            text-align: center;
        
        }
        }
    }  
  }
</style>
