import Vue from 'vue'
import Vuex from 'vuex'
import PokemonStore from './PokemonStore';

Vue.use(Vuex)


export default function () {
  const Store = new Vuex.Store({
    modules: {
      PokemonStore
    },

    strict: process.env.DEBUGGING
  })

  return Store
}
