import type { LocaleSetting, LocaleType } from '/#/config'
import { LOCALE_KEY } from '/@/enums/cacheEnum'
import { createLocalStorage } from '/@/utils/cache'
import { localeSetting } from '/@/settings/localeSetting'
import { Commit } from 'vuex/types'
const ls = createLocalStorage()

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting

interface LocaleState {
  localInfo: LocaleSetting
}

const state = (): LocaleState => ({
  localInfo: lsLocaleSetting,
})
const getters = {
  getShowPicker: (state: LocaleState): boolean => !!state.localInfo?.showPicker,
  getLocale: (state: LocaleState): LocaleType =>
    state.localInfo?.locale ?? 'en',
}
const actions = {
  initLocale({ commit, state }: { commit: Commit; state: LocaleState }) {
    commit('SET_LOCALE_INFO', {
      ...localeSetting,
      ...state.localInfo,
    })
  },
}
const mutations = {
  SET_LOCALE_INFO: function (state: LocaleState, info: Partial<LocaleSetting>) {
    state.localInfo = { ...state.localInfo, ...info }
    ls.set(LOCALE_KEY, state.localInfo)
  },
}
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
