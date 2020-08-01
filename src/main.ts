import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import socket from "./socket.plugin";
import { mapMutations } from "vuex";

Vue.config.productionTip = false;
Vue.use(socket);

new Vue({
  mounted() {
    this.$socket.on("connect", () => {
      this.setClientId(this.$socket.id);
    });
  },
  methods: {
    ...mapMutations("me", ["setClientId"]),
  },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
