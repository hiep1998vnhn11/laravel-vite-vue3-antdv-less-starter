import { Commit } from 'vuex/types'
import type { UserInfo } from '/#/store'
import { RoleEnum } from '/@/enums/roleEnum'
import { PageEnum } from '/@/enums/pageEnum'
import {
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
  REFRESH_TOKEN_KEY,
} from '/@/enums/cacheEnum'
import { getAuthCache, setAuthCache } from '/@/utils/auth'
import { GetUserInfoModel, LoginParams } from '/@/api/sys/model/userModel'
import { getUserInfo, loginApi } from '/@/api/sys/user'
import { useI18n } from '/@/hooks/web/useI18n'
import { useMessage } from '/@/hooks/web/useMessage'
import { router } from '/@/router'

interface UserState {
  userInfo: Nullable<UserInfo>
  token?: string
  roleList: RoleEnum[]
  sessionTimeout?: boolean
}
type StateKey = 'userInfo' | 'token' | 'roleList' | 'sessionTimeout'

const state = (): UserState => ({
  userInfo: null,
  token: undefined,
  roleList: [],
  sessionTimeout: false,
})
const getters = {
  getUserInfo: (state: UserState): UserInfo =>
    state.userInfo || getAuthCache<UserInfo>(USER_INFO_KEY) || {},
  getToken: (state: UserState): string =>
    state.token || getAuthCache<string>(TOKEN_KEY),
  getRoleList: (state: UserState): RoleEnum[] =>
    state.roleList.length > 0
      ? state.roleList
      : getAuthCache<RoleEnum[]>(ROLES_KEY),
  getSessionTimeout: (state: UserState): boolean => !!state.sessionTimeout,
}

async function logout(commit: Commit, goLogin: boolean = false) {
  commit('SET_STATE', ['token', undefined])
  setAuthCache(TOKEN_KEY, undefined)
  setAuthCache(REFRESH_TOKEN_KEY, undefined)
  setAuthCache(ROLES_KEY, undefined)
  commit('SET_STATE', ['sessionTimeout', false])
  window.location.href = 'https://edapt.education'
}

const actions = {
  setToken({ commit }: { commit: Commit }, info: string | undefined) {
    commit('SET_STATE', ['token', info])
    setAuthCache(TOKEN_KEY, info)
  },
  setRoleList({ commit }: { commit: Commit }, roleList: RoleEnum[]) {
    commit('SET_STATE', ['roleList', roleList])
    setAuthCache(ROLES_KEY, roleList)
  },
  setUserInfo({ commit }: { commit: Commit }, info: UserInfo) {
    commit('SET_STATE', ['userInfo', info])
    setAuthCache(USER_INFO_KEY, info)
  },
  setSessionTimeout({ commit }: { commit: Commit }, flag: boolean) {
    commit('SET_STATE', ['sessionTimeout', flag])
  },
  async login(
    { commit, state }: { commit: Commit; state: UserState },
    params: LoginParams
  ): Promise<GetUserInfoModel | null> {
    try {
      const data = await loginApi(params)
      const { access_token, refresh_token, userInfo } = data
      commit('SET_STATE', ['token', access_token])
      setAuthCache(TOKEN_KEY, access_token)
      setAuthCache(REFRESH_TOKEN_KEY, refresh_token)
      commit('SET_STATE', ['userInfo', userInfo])
      setAuthCache(USER_INFO_KEY, userInfo)
      const roleList = userInfo?.roles.map(
        (item: any) => item.name
      ) as RoleEnum[]
      commit('SET_STATE', ['roleList', roleList])
      setAuthCache(ROLES_KEY, roleList)
      const sessionTimeout = state.sessionTimeout
      sessionTimeout && commit('SET_STATE', ['sessionTimeout', false])
      await router.replace(PageEnum.BASE_HOME)
      return userInfo
    } catch (error) {
      return Promise.reject(error)
    }
  },
  confirmLoginOut({ commit }: { commit: Commit }) {
    const { createConfirm } = useMessage()
    const { t } = useI18n()
    createConfirm({
      iconType: 'warning',
      title: t('sys.app.logoutTip'),
      content: t('sys.app.logoutMessage'),
      onOk: async () => {
        await logout(commit, true)
      },
    })
  },

  async getCurrentUser({
    commit,
    state,
  }: {
    commit: Commit
    state: UserState
  }) {
    const userInfo = await getUserInfo()
    commit('SET_STATE', ['userInfo', userInfo])
    setAuthCache(USER_INFO_KEY, userInfo)
    const roleList = userInfo?.roles.map((item: any) => item.name) as RoleEnum[]
    commit('SET_STATE', ['roleList', roleList])
    setAuthCache(ROLES_KEY, roleList)
  },
}

const mutations = {
  SET_STATE: function (state: any, payload: [StateKey, any]) {
    const [key, value] = payload
    state[key] = value
  },
  RESET_STATE: function (state: UserState) {
    state.userInfo = null
    state.token = ''
    state.roleList = []
    state.sessionTimeout = false
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
