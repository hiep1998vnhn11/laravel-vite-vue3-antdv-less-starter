<template>
  <div class="p-1" @click="changeModal(true)">
    <Tooltip :title="t('common.searchText')">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
          stroke="#9497B2"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M21 21L16.65 16.65"
          stroke="#9497B2"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </Tooltip>
    <AppSearchModal @close="changeModal(false)" :visible="showModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Tooltip } from 'ant-design-vue'
import AppSearchModal from './AppSearchModal.vue'
import { useI18n } from '/@/hooks/web/useI18n'

export default defineComponent({
  name: 'AppSearch',
  components: {
    Tooltip,
    AppSearchModal,
  },
  setup() {
    const showModal = ref(false)
    const { t } = useI18n()

    function changeModal(show: boolean) {
      showModal.value = show
    }

    return {
      t,
      changeModal,
      showModal,
    }
  },
})
</script>
