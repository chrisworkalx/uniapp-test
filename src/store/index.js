// src/store/index.js
import Vue from "vue";
import Vuex from "vuex";
import counter from "./modules/counter"; // 引入模块
import counter2 from "./modules/counter2"; // 引入模块
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0, // 这里可以定义你的状态
    name: "chris",
  },
  mutations: {
    increment(state, payload) {
      state.count += payload || 1; // 定义一个增量的方法
    },
    decrement(state) {
      state.count--; // 定义一个减量的方法
    },
  },
  actions: {
    increment({ commit }) {
      commit("increment"); // 提交增量的方法
    },
    decrement({ commit }) {
      commit("decrement"); // 提交减量的方法
    },
    incrementAsync({ commit }, amount) {
      // 使用参数 amount
      setTimeout(() => {
        commit("increment", amount); // 提交 mutation 并传递参数
      }, 1000);
    },
  },
  getters: {
    getCount(state) {
      return state.count; // 获取状态值的方法
    },
  },
  modules: {
    counter, // 模块注册
    counter2,
  },
});

export default store;
