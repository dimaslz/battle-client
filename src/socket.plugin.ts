import SocketIO from "socket.io-client";
import { SOCKET_URL } from "../env";

const plugin: any = {};

plugin.install = (Vue: any, options: any) => {
  Vue.prototype.$socket = SocketIO(SOCKET_URL);
};

export default plugin;
