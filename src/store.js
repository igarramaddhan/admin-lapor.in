import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const SET_LAPORAN = 'SET_LAPORAN';

export default new Vuex.Store({
  state: {
    laporan: []
  },
  mutations: {
    [SET_LAPORAN](state, { laporan }) {
      state.laporan = laporan;
    }
  },
  actions: {
    setLaporan({ commit }, laporan) {
      commit(SET_LAPORAN, {
        laporan
      });
    }
  }
});
