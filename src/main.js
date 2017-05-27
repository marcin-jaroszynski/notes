// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import TitlePageComponent from './components/TitlePage';
import SideMenuTemplate from './components/templates/SideMenu';

Vue.config.productionTip = false;
Vue.component('title-page', TitlePageComponent);
Vue.component('side-menu', SideMenuTemplate);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
