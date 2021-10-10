<template>
  <div :class="prefixCls">
    <a-button type="primary" block @click="handleCopy">
      <CopyOutlined class="mr-2" />
      {{ t('layout.setting.copyBtn') }}
    </a-button>

    <a-button color="warning" block @click="handleResetSetting" class="my-3">
      <RedoOutlined class="mr-2" />
      {{ t('common.resetText') }}
    </a-button>

    <a-button color="error" block @click="handleClearAndRedo">
      <RedoOutlined class="mr-2" />
      {{ t('layout.setting.clearBtn') }}
    </a-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, unref } from 'vue'

import { CopyOutlined, RedoOutlined } from '@ant-design/icons-vue'

import { useStore } from 'vuex'

import { useDesign } from '/@/hooks/web/useDesign'
import { useI18n } from '/@/hooks/web/useI18n'
import { useMessage } from '/@/hooks/web/useMessage'
import { useCopyToClipboard } from '/@/hooks/web/useCopyToClipboard'

import { updateColorWeak } from '/@/logics/theme/updateColorWeak'
import { updateGrayMode } from '/@/logics/theme/updateGrayMode'
import defaultSetting from '/@/settings/projectSetting'

export default defineComponent({
  name: 'SettingFooter',
  components: { CopyOutlined, RedoOutlined },
  setup() {
    const { prefixCls } = useDesign('setting-footer')
    const { t } = useI18n()
    const { createSuccessModal, createMessage } = useMessage()
    const store = useStore()

    function handleCopy() {
      const { isSuccessRef } = useCopyToClipboard(
        JSON.stringify(unref(store.getters['app/getProjectConfig']), null, 2)
      )
      unref(isSuccessRef) &&
        createSuccessModal({
          title: t('layout.setting.operatingTitle'),
          content: t('layout.setting.operatingContent'),
        })
    }
    function handleResetSetting() {
      try {
        store.commit('app/SET_PROJECT_CONFIG', defaultSetting)
        const { colorWeak, grayMode } = defaultSetting
        updateColorWeak(colorWeak)
        updateGrayMode(grayMode)
        createMessage.success(t('layout.setting.resetSuccess'))
      } catch (error) {
        createMessage.error(error)
      }
    }

    function handleClearAndRedo() {
      localStorage.clear()
      store.commit('app/RESET_STATE')
      store.commit('permission/RESET_STATE')
      store.commit('multipleTab/RESET_STATE')
      store.commit('user/RESET_STATE')
      location.reload()
    }
    return {
      prefixCls,
      t,
      handleCopy,
      handleResetSetting,
      handleClearAndRedo,
    }
  },
})
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-setting-footer';

.@{prefix-cls} {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
