<template>
    <div class="zheye-recommend">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item,index) in recommendTabs" :key="index" :label="item.title" :name="item.title" :data-url="item.link">
                <el-row :gutter="20">
                    <el-col :xs="12" :md="6" :lg="6" :xl="4" v-for="(r,rindex) in recommend[item.title]" :key="rindex">
                        <div class="zheye-recommend-item" @click="goto(r.link)" :title="r.title">
                            <div class="thumb"><img v-lazy="r.thumb" alt="" @load="loadComplete"></div>
                            <div class="title">{{r.title}}</div>
                            <div class="author">{{r.author}}</div>
                        </div>
                    </el-col>
                </el-row>
            </el-tab-pane>
            
        </el-tabs>
    </div>
</template>

<script>
import cheerio from 'cheerio'
export default {
  name: 'Recommend',
  data () {
    return {
      activeName: '站酷网',
      recommendTabs: [
        {
          title: '站酷网',
          link: 'https://www.zcool.com.cn/discover/17!0!0!0!0!!!!3!-1!1'
        },
        {
          title: 'UI中国',
          link: 'http://www.ui.cn/'
        }
      ],
      recommend: {

      }
    //   recommend: []
    }
  },
  created () {
    // 加载第一个选项卡数据
    this.getWebData(this.recommendTabs[0].title, this.recommendTabs[0].link)
  },
  methods: {
    handleClick (tab, event) {
      let title = tab.label
      let weburl = tab.$el.dataset.url
      this.getWebData(title, weburl)
    },
    goto (link) {
      this.$electron.shell.openExternal(link)
    },
    getWebData (title, weburl) {
      if (this.recommend[title] && this.recommend[title].length > 0) return
      let recommend = []
      switch (title) {
        case '站酷网':
          this.$http.get(weburl).then(res => {
            const $ = cheerio.load(res.data)
            $('.work-list-box').find('.card-box').each(function (index, item) {
              if (index >= 12) return
              recommend.push({
                title: $(item).find('.card-img-hover').attr('title'),
                thumb: $(item).find('.card-img-hover').find('img').attr('src'),
                link: $(item).find('.card-img-hover').attr('href'),
                author: $(item).find('.user-avatar').find('a').attr('title')
              })
            })
          })
          break
        case 'UI中国':
          this.$http.get(weburl).then(res => {
            const $ = cheerio.load(res.data)
            $('.post-works').find('li').each(function (index, item) {
              if (index >= 12) return
              recommend.push({
                title: $(item).find('.cover').find('a').attr('title'),
                thumb: $(item).find('.cover').find('a').find('img').attr('data-original') + '?imageMogr2/auto-orient/strip/thumbnail/!362',
                link: $(item).find('.cover').find('a').attr('href'),
                author: $(item).find('.name').text()
              })
            })
          })
          break
        default:
          break
      }
      this.$set(this.recommend, title, recommend)

    //   this.recommend[title] = recommend
    },
    loadComplete () {
      this.$store.commit('SET_DOM_UPDATE')
    }
  }
}
</script>

<style lang="less">
    .zheye-recommend{
        background: #fff;
        border-radius: 4px;
        padding: 15px 20px;
        box-shadow:0 5px 15px rgba(126,34,137,0.08);
        margin-bottom: 20px;
        .el-tabs__item{
            font-size: 12px;
            color: #666;
            &.is-active,&:hover {
                color: #333;
            }
        }
        .el-tabs__nav-wrap::after{
            height: 2px;
            background-color: #fcfcfc;
        }
        .el-tabs__active-bar{
            background-color: #75777d;
        }
        &-item{
            cursor: pointer;
            
            .thumb{
                width: 100%;
                transition: all .3s;
                img{
                    display: block;
                    width: 100%;
                    border-radius: 4px;
                }
                &:hover{
                    box-shadow:0 5px 15px rgba(126,34,137,0.3);
                }
            }
            .title{
                padding-top: 10px;
                height:30px;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .author{
                font-size: 12px;
                height: 30px;
                margin-bottom: 10px;
            }
        }
    }
</style>
