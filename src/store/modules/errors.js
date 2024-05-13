export default {
    namespaced: true,
    state: {
        errors: []
    },
    getters: {
        getErrors: state => {
            return state.errors
        }
    },
    mutations: {
        addError(state, message) {
            state.errors.push(message)
        },
        clear(state) {
            state.errors = [];
        }
    },
    actions: {
        addError({ commit }, message) {
            commit('addError', message)
        },
        clear({ commit}) {
            commit('clear')
        }
    },
}
