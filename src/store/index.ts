import Vue from "vue";
import Vuex from "vuex";
import { uuid } from "@/utils";
import Api from "../api";
const API = new Api();

Vue.use(Vuex);

interface MeState {
  name: string;
  score: number;
  joined: boolean;
  clientId: string;
}

interface OpponentState {
  name: string;
  score: number;
}

interface GameState {
  state: {
    loading: boolean;
    error: boolean;
  };
  roomId: string;
}
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    me: {
      namespaced: true,
      state: {
        name: null,
        score: 0,
        joined: false,
        clientId: "",
      },
      mutations: {
        join(state: MeState, join: boolean) {
          state.joined = join;
        },
        setName(state: MeState, name: string) {
          state.name = name;
        },
        setClientId(state: MeState, clientId: string) {
          state.clientId = clientId;
        },
        updateScore(state: MeState) {
          state.score++;
        },
      },
    },
    opponent: {
      namespaced: true,
      state: {
        name: null,
        score: 0,
      },
      mutations: {
        setName(state: OpponentState, name: string) {
          state.name = name;
        },
        updateScore(state: OpponentState) {
          state.score++;
        },
      },
    },
    game: {
      namespaced: true,
      state: {
        state: {
          loading: false,
          error: false,
        },
        roomId: null,
      },
      mutations: {
        setRoomName(state: GameState, roomId: string) {
          state.roomId = roomId;
        },
        setLoading(state: GameState, loading: boolean) {
          state.state.loading = loading;
        },
      },
      actions: {
        async createRoom({ commit, rootState }: any) {
          const roomId = uuid();
          const userId = rootState.me.name;

          commit("setLoading", true);

          await API.createRoom(roomId, userId);

          commit("setLoading", false);
          commit("setRoomName", roomId);

          return roomId;
        },
        async leaveRoom({ commit, state, rootState }: any) {
          const { roomId } = state;
          const userId = rootState.me.name;

          await API.leaveRoom(roomId, userId);

          commit("setLoading", false);
        },
        async joinRoom({ commit, rootState, state }: any, { roomId }: any) {
          const userId = rootState.me.name;
          const clientId = rootState.me.clientId;
          console.log("clientId", clientId);

          commit("setRoomName", roomId);

          const data = await API.joinRoom(roomId, userId, clientId).then(
            ({ data }: any) => data
          );

          if (data === null) {
            commit("me/join", false, { root: true });
            commit("opponent/setName", null, { root: true });
          } else {
            const { joined, opponentId } = data;
            commit("me/join", joined, { root: true });
            commit("opponent/setName", opponentId, { root: true });
          }
        },
      },
    },
  },
});
