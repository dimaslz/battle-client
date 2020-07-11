import SocketIO from "socket.io-client";
import { API_URL } from "../env";

const plugin: any = {};

plugin.install = (Vue: any, options: any) => {
  Vue.prototype.$socket = SocketIO(API_URL);
};

export default plugin;
