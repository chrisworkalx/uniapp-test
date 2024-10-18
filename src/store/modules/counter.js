// src/store/modules/counter.js
const state = {
  count: 20,
};

const mutations = {
  increment(state) {
    state.count += 10;
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
  incrementOtherModule({ commit, dispatch, state, rootState }, payload) {
    console.log(rootState, "===rootState");
    dispatch("incrementAsync", payload); // 更新本模块
    dispatch("incrementAsync", payload, { root: true }); // 更新主模块
    dispatch("counter2/incrementAsync", payload, { root: true }); // 更新其他模块
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
