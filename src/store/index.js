import { createStore, createLogger } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
