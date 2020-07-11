import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import socket from "./socket.plugin";
import { mapMutations } from "vuex";

// import SocketIO from "socket.io-client";
// import VueSocketIO from 'vue-socket.io';

// Vue.use(new VueSocketIO({
//   debug: true,
//   connection: SocketIO('http://localhost:8081'), //options object is Optional
//   vuex: {
//     store,
//     actionPrefix: "SOCKET_",
//     mutationPrefix: "SOCKET_"
//   }
// }));

Vue.config.productionTip = false;
Vue.use(socket);

new Vue({
  // sockets: {
  //   connect: function () {
  //       console.log('socket connected')
  //   },
  //   customEmit: function (data) {
  //       console.log('this method was fired by the socket server. eg: io.emit("customEmit", data)')
  //   }
  // },
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
