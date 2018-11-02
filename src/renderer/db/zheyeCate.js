import db from '../datastore'

let zheyeCate = {

}
zheyeCate.count = function (obj = {}) {
  return new Promise((resolve, reject) => {
    db.zheye_cate.count(obj, (err, count) => {
      if (err) reject(err)
      resolve(count)
    })
  })
}
zheyeCate.hasData = function (obj = {}) {
  return new Promise((resolve, reject) => {
    db.zheye_cate.findOne(obj, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
zheyeCate.insert = function (obj = {}) {
  return new Promise((resolve, reject) => {
    db.zheye_cate.insert(obj, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
zheyeCate.insertAll = function (arr = [{}]) {
  return new Promise((resolve, reject) => {
    db.zheye_cate.insert(arr, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
zheyeCate.find = function (obj = {}) {
  return new Promise((resolve, reject) => {
    db.zheye_cate.find(obj, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
zheyeCate.update = function (query = {}, update = {}, options = {}) {
  return new Promise((resolve, reject) => {
    db.zheye_cate.update(query, update, options, (err, numReplaced) => {
      if (err) reject(err)
      resolve(numReplaced)
    })
  })
}

export default zheyeCate
