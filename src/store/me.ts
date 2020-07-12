interface MeState {
  name: string;
  score: number;
  joined: boolean;
  clientId: string;
}

export default {
  namespaced: true,
  state: {
    name: "",
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
};
