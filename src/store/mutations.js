const mutations = {
    // login(state, username) {
    //     state.userAccount = username
    // },
    saveUserInfo(state, userInfo) {
        state.userInfo = userInfo
    },
    login_in(state, token) {
        state.UserToken = token
    },
    // login_out(state, token) {
    //     state.UserToken = ''
    // },
    saveMenus(state, menus) {
        state.menus = menus
    }
}

export default mutations