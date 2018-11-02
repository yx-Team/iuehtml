
import history from '@/db/history'
import zheyeCate from '@/db/zheyeCate'
import zheye from '@/db/zheye'
import { getCate, getList } from '@/api/zheye'
const state = {
  // 历史总数
  historyCount: 0,
  cate: [],
  zheye: []
}

const mutations = {
  SET_HISTORY_COUNT (state, count) {
    return (state.historyCount = count)
  },
  SET_CATEGORY (state, payload) {
    return (state.cate = payload)
  },
  SET_ALL_ZHEYE (state, payload) {
    return (state.zheye = payload)
  }

}
const actions = {
  // 获取历史记录的数量
  async getHistoryCount ({ commit }) {
    const count = await history.count({})
    commit('SET_HISTORY_COUNT', count)
  },
  //   保存更新历史记录
  async saveHistory ({commit, state, dispatch}, item) {
    let total = state.historyCount
    let hasData = await history.hasData({title: item.title})
    let result
    try {
      if (!hasData) {
        item.sort = total
        result = await history.insert(item)
      } else {
        result = await history.update({title: item.title}, {$set: {sort: total}})
      }
    } catch (error) {
      console.log(error)
    }
    dispatch('getHistoryCount')
    return result
  },
  // 获取分类
  async getCategory ({commit}) {
    // 检查是否有本地数据，没有请求网络数据，
    let result = []
    let hasData = await zheyeCate.hasData()
    if (hasData) {
      result = await zheyeCate.find()
    } else {
      result = await getCate()
      result = result.data.data
      await zheyeCate.insertAll(result)
    }
    commit('SET_CATEGORY', result)
  },
  // 获取所有内容
  async getAllZheye ({commit}) {
    // 检查是否有本地数据，没有请求网络数据，
    let result = []
    let hasData = await zheye.hasData()
    if (hasData) {
      result = await zheye.find()
    } else {
      result = await getList()
      result = result.data.data
      await zheye.insertAll(result)
    }
    commit('SET_ALL_ZHEYE', result)
  }
}

export default {
  state,
  mutations,
  actions
}
