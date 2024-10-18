// src/store/modules/counter.js
const state = {
  count: 40,
};

const mutations = {
  increment(state) {
    state.count += 40;
  },
  decrement(state) {
    state.count--;
  },
};

const actions = {
  incrementAsync({ commit }) {
    setTimeout(() => {
      commit("increment");
    }, 1000);
  },
};

const getters = {
  getCount(state) {
    return state.count;
  },
};

export default {
  namespaced: true, // 启用命名空间
  state,
  mutations,
  actions,
  getters,
};
