import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/app.min.css'
import './assets/iconfont/font.css'

import api from './api' // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上复制代码

console.log('%c Versions 20200301 ', "font-size: 42px; color: #FFFFFF;background-image: linear-gradient(to right, #12c2e9, #c471ed, #f7797d);");
console.log(`
  く__,.ヘヽ.        /  ,ー､ 〉
           ＼ ', !-─‐-i  /  /´
           ／｀ｰ'       L/／｀ヽ､
         /   ／,   /|   ,   ,       ',
       ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
          !,/7 '0'     ´0iソ|    |
          |.从"    _     ,,,, / |./    |
          ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
              | |/i 〈|/   i  ,.ﾍ |  i  |
             .|/ /  ｉ：    ﾍ!    ＼  |
              kヽ>､ﾊ    _,.ﾍ､    /､!
              !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
              ﾚ'ヽL__|___i,___,ンﾚ|ノ
                  ﾄ-,/  |___./
                  'ｰ'    !_,.:
`);

// element
import { Container, Header, Aside, Main, Footer, Button, Row, Col,Carousel, CarouselItem, Collapse, CollapseItem, Upload, Icon, Message, Loading, ColorPicker, Select, Option, OptionGroup, Divider, Dialog, Tabs, TabPane, Input, Avatar } from 'element-ui';
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Button);
Vue.use(Row);
Vue.use(Col);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(Upload);
Vue.use(Icon);
Vue.prototype.$message = Message;
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.use(ColorPicker);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(Divider);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Input);
Vue.use(Avatar)

// vdr
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

