import SocketIO from "socket.io-client";

const plugin: any = {};

plugin.install = (Vue: any, options: any) => {
  // Vue.prototype.$socket = SocketIO('http://localhost:8081', {transports: ['websocket']});
  Vue.prototype.$socket = SocketIO('http://localhost:8081');
  // Vue.prototype.$socket = Vue.prototype.$socket.in("BvH95_xkFdgXFdJeAAAA");
}

export default plugin;