const mutations = {
    login(state, username) {
        state.userAccount = username
    },
    saveUserInfo(state, userInfo) {
        state.userInfo = userInfo
    }
}

export default mutations