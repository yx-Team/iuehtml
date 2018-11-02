import db from '../datastore'

let history = {

}
history.count = function (obj = {}) {
  return new Promise((resolve, reject) => {
    db.history.count(obj, (err, count) => {
      if (err) reject(err)
      resolve(count)
    })
  })
}
history.hasData = function (obj = {}) {
  return new Promise((resolve, reject) => {
    db.history.findOne(obj, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
history.insert = function (obj = {}) {
  return new Promise((resolve, reject) => {
    db.history.insert(obj, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
history.insertAll = function (arr = [{}]) {
  return new Promise((resolve, reject) => {
    db.history.insert(arr, (err, doc) => {
      if (err) reject(err)
      resolve(doc)
    })
  })
}
history.update = function (query = {}, update = {}, options = {}) {
  return new Promise((resolve, reject) => {
    db.history.update(query, update, options, (err, numReplaced) => {
      if (err) reject(err)
      resolve(numReplaced)
    })
  })
}

export default history
