import db from '../datastore'

let zheye = {

}
zheye.count = function (obj = {}) {
  return new Promise((resolve, reject) => {
    db.zheye.count(obj, (err, count) => {
      if (err) reject(err)
      resolve(count)
    })
  })
}
zheye.hasData = function (obj = {}) {
  return new Promise((resolve, reject) => {
    db.zheye.findOne(obj, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
zheye.insert = function (obj = {}) {
  return new Promise((resolve, reject) => {
    db.zheye.insert(obj, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
zheye.insertAll = function (arr = [{}]) {
  return new Promise((resolve, reject) => {
    db.zheye.insert(arr, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
zheye.find = function (obj = {}) {
  return new Promise((resolve, reject) => {
    db.zheye.find(obj, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
zheye.update = function (query = {}, update = {}, options = {}) {
  return new Promise((resolve, reject) => {
    db.zheye.update(query, update, options, (err, numReplaced) => {
      if (err) reject(err)
      resolve(numReplaced)
    })
  })
}

export default zheye
