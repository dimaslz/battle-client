import Vue from "vue";
import Vuex from "vuex";

import { default as MeModule } from "./me";
import { default as OpponentModule } from "./opponent";
import { default as GameModule } from "./game";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    me: MeModule,
    opponent: OpponentModule,
    game: GameModule,
  },
});
