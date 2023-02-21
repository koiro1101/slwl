import { getToken, setToken, delToken } from "../../utils/storage";
const user = {
  namespaced: true,
  state: {
    token: getToken(),
  },
  mutations: {
    token(state, val) {
      setToken(val);
      state.token = val;
    },
    delToken(state) {
      delToken();
      state.token = null;
    },
    logOut() {
      delToken();
      state.token = null;
      this.$router.push('/login')
    }
  },
};
export default user;
