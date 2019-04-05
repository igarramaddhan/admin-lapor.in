import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import router from './router';
import store from './store';
import { client } from './libs/client';

Vue.prototype.$client = client;

Vue.prototype.$localStorage = new Vue({
  data() {
    const token = localStorage.getItem('api-token');
    if (token) {
      this.$client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return { token };
  },
  watch: {
    async token(value, old) {
      if (value) {
        await localStorage.setItem('api-token', value);
        this.$client.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${value}`;
        if (old == null) router.replace('/');
      } else {
        localStorage.clear();
        this.$client.defaults.headers.common['Authorization'] = null;
        location.reload();
      }
    }
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
