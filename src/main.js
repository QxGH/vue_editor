import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style/app.min.css'

// element
import { Container, Header, Aside, Main, Footer, Button, Row, Col,Carousel, CarouselItem, Collapse, CollapseItem, Upload, Icon, Message, Loading, ColorPicker, Select, Option, OptionGroup, Divider, Dialog, Tabs, TabPane } from 'element-ui';
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

// vdr
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
