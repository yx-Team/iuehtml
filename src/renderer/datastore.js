import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

let db = {}
db.history = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/data.db')
})
db.zheye = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/zheye.db')
})
db.zheye_cate = new Datastore({
  autoload: true,
  filename: path.join(remote.app.getPath('userData'), '/zheye_cate.db')
})
export default db
