import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        userAccount: null,
        userInfo: {
            avatar: ''
        } //里面有loginInfo,roles,
    },
    mutations,
    actions,
    getters
})

export default store