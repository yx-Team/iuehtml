<template>
    <div class="top-search">
        <el-input placeholder="请输入内容" v-model.trim="search" clearable class="input-with-select">
            <el-select v-model="select" slot="prepend"  placeholder="请选择">
              <el-option v-for="(item,index) in source" :label="item.label" :value="index" :key="index"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            
        </el-input>
    </div>
</template>
<script>
export default {
  name: 'Search',
  data () {
    return {
      search: '',
      select: 0,
      source: [
        {
          label: '花瓣',
          url: 'http://huaban.com/search/?type=pins&q='
        }, {
          label: 'ui中国',
          url: 'http://s.ui.cn/index.html?type=project&keywords='
        }, {
          label: 'Behance',
          url: 'https://www.behance.net/search?content=projects&sort=appreciations&time=week&featured_on_behance=true&search='
        }, {
          label: 'Dribbble',
          url: 'https://dribbble.com/search?q='
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    // 搜索
    handleSearch () {
      if (!this.search) {
        this.$message({
          message: '请选择输入关键字',
          type: 'warning'
        })
        return
      }
      var keyword = this.search
      var link = this.source[this.select].url
      var url = encodeURI(link + keyword)
      this.$electron.shell.openExternal(url)
    }
  }
}
</script>

<style lang="less">
.top-search {
  background: #fff;
  padding: 20px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  overflow: hidden;
  .el-select .el-input {
    width: 130px;
  }
  .el-input__inner{
    background: #f1f2f9;
    border: none;
    border-top-left-radius: 4px!important;
    border-bottom-left-radius: 4px!important;
    margin-left: 20px;
  }
  .el-input-group__prepend,.el-input-group__append{
    border:none;
    background: #f1f2f9;
    border-radius: 4px;
  }
}
</style>
