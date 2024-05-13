import UsersApi from "@/api/users/users-api";

export default {
    namespaced: true,
    state: {
        isLoggedIn: !!localStorage.getItem("access_token"),
        loading: false
    },
    getters: {
        isLoggedIn: state => {
            return state.isLoggedIn
        },
        isLoading: state => {
            return state.loading
        }
    },
    mutations: {
        startLoading(state) {
            state.loading = true
        },
        stopLoading(state) {
            state.loading = false
        },
        loginSuccess(state) {
            state.isLoggedIn = true
        },
        logout(state) {
            state.isLoggedIn = false
        }
    },
    actions: {
        signUp({commit, dispatch}, attributes) {
            return new Promise(resolve => {
                commit('startLoading');
                dispatch('errors/clear', null, { root: true })
                UsersApi.signUp(attributes.name, attributes.email, attributes.password)
                    .then((response) => {
                        const accessToken = response.data.meta.token;
                        localStorage.setItem("access_token", accessToken);
                        commit('loginSuccess')
                        resolve()
                    }).finally(() => {
                        commit('stopLoading')
                    })
            });
        },
        login({ commit, dispatch }, credentials) {
            return new Promise(resolve => {
                commit('startLoading');
                dispatch('errors/clear', null, { root: true })
                UsersApi.signIn(credentials.email, credentials.password)
                    .then((response) => {
                        const accessToken = response.data.meta.token;
                        localStorage.setItem("access_token", accessToken);
                        commit('loginSuccess')
                        resolve()
                    }).finally(() => {
                        commit('stopLoading')
                    })
            });
        },
        logout({ commit }) {
            return new Promise(resolve => {
                commit('startLoading');
                UsersApi.logout()
                    .then(() => {
                        localStorage.removeItem("access_token");
                        commit('logout');
                        resolve()
                    }).finally(() => {
                        commit('stopLoading')
                    })
            });
        },
        forceLogout({commit}) {
            localStorage.removeItem("access_token");
            commit('logout');
            window.location.href = '/sign-in'
        }
    },
}
