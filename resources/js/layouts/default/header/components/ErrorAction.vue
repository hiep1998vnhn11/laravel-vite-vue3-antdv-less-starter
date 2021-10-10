<template>
  <Tooltip
    :title="t('layout.header.tooltipErrorLog')"
    placement="bottom"
    :mouseEnterDelay="0.5"
    @click="handleToErrorList"
  >
    <Badge :count="getCount" :offset="[0, 10]" :overflowCount="99">
      <Icon icon="ion:bug-outline" />
    </Badge>
  </Tooltip>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Tooltip, Badge } from 'ant-design-vue'
import Icon from '/@/components/Icon/Icon.vue'

import { useI18n } from '/@/hooks/web/useI18n'
import { useStore } from 'vuex'
import { PageEnum } from '/@/enums/pageEnum'

import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ErrorAction',
  components: { Icon, Tooltip, Badge },

  setup() {
    const { t } = useI18n()
    const { push } = useRouter()
    const store = useStore()

    const getCount = computed(
      () => store.getters['errorLog/getErrorLogListCount']
    )

    function handleToErrorList() {
      push(PageEnum.ERROR_LOG_PAGE).then(() => {
        store.commit('errorLog/SET_ERROR_LOG_LIST_COUNT', 0)
      })
    }

    return {
      t,
      getCount,
      handleToErrorList,
    }
  },
})
</script>
