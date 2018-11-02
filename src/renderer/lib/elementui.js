import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import {
  Tabs,
  TabPane,
  Alert,
  Select,
  Option,
  OptionGroup,
  Card,
  Row,
  Col,
  Scrollbar,
  Input,
  Switch,
  Button,
  Dialog,
  Message,
  MessageBox,
  Loading

} from 'element-ui'

Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Alert)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Scrollbar)
Vue.use(Input)
Vue.use(Switch)
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$message = Message
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
