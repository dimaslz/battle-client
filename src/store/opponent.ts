interface OpponentState {
  name: string;
  score: number;
}

export default {
  namespaced: true,
  state: {
    name: "",
    score: 0,
  },
  mutations: {
    setName(state: OpponentState, name: string) {
      state.name = name;
    },
    updateScore(state: OpponentState) {
      state.score++;
    },
    opponentLeft(state: OpponentState) {
      state.name = "";
      state.score = 0;
    },
  },
};
