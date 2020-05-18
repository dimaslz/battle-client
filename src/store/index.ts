import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import { uuid } from "@/utils";

Vue.use(Vuex);

interface MeState {
  name: string;
  score: number;
  joined: boolean;
}

interface OpponentState {
  name: string;
  score: number;
}

interface GameState {
  state: {
    loading: boolean;
    error: boolean;
  },
  roomId: string;
}
export default new Vuex.Store({
  state: {
    
  },
  mutations: {
    
  },
  actions: {
    
  },
  modules: {
    me: {
      namespaced: true,
      state: {
        name: null,
        score: 0,
        joined: false,
      },
      mutations: {
        join(state: MeState, join: boolean) {
          state.joined = join;
        },
        setName(state: MeState, name: string) {
          state.name = name;
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
        }
      },
      actions: {
        async createRoom({ commit }: any) {
          const roomId = uuid();
          commit('setLoading', true);

          await axios({
            method: "POST",
            url: "http://localhost:3000/room",
            data: {
              roomId
            }
          }).then(() => {
            commit('setLoading', false);
            commit('setRoomName', roomId);
          });

          return roomId;
        },
        async leaveRoom({ commit, state, rootState }: any) {
          const { roomId } = state;
          const userId = rootState.me.name;
          
          await axios({
            method: "POST",
            url: `http://localhost:3000/leave/${roomId}`,
            data: {
              userId
            }
          }).then(() => {
            commit('setLoading', false);
          });
        },
        async joinRoom({ commit, rootState, state }: any, { clientId, roomId }: any) {
          const userId = rootState.me.name;

          commit('setRoomName', roomId);
          
          return axios({
            method: "POST",
            url: `http://localhost:3000/join/${roomId}`,
            data: {
              userId,
              clientId
            }
          }).then(({ data }: any) => {
            if (data === null) {
              commit('me/join', false, { root: true });
              commit('opponent/setName', null, { root: true });
            } else {
              const { joined, opponentId } = data;
              commit('me/join', joined, { root: true });
              commit('opponent/setName', opponentId, { root: true });
            }
          });
        }
      },
    },
  }
});
