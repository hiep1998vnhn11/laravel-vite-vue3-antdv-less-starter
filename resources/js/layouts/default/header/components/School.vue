<template>
  <div :class="prefixCls">
    <span v-if="!isProduction" class="text-danger">RDS_UAT</span>
    <img
      :class="`${prefixCls}__header`"
      :src="getUserInfo.school_image"
      @error="onImageError"
    />
    <span :class="`${prefixCls}__name`">
      {{ getUserInfo.school_id }}
    </span>
  </div>
</template>
<script lang="ts">
// components
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
import { useI18n } from '/@/hooks/web/useI18n'
import { useDesign } from '/@/hooks/web/useDesign'
import { useModal } from '/@/components/Modal'
import { useRouter } from 'vue-router'
import { propTypes } from '/@/utils/propTypes'
import { ErrorImage } from '/@/enums/imageEnum'
type MenuEvent = 'logout' | 'account'

export default defineComponent({
  name: 'School',
  props: {
    theme: propTypes.oneOf(['dark', 'light']),
  },
  setup() {
    const router = useRouter()
    const { prefixCls } = useDesign('header-school')
    const { t } = useI18n()
    const { getShowDoc, getUseLockPage } = useHeaderSetting()
    const isProduction = computed(() =>
      import.meta.env.VITE_DB_ENV
        ? localStorage.getItem('env') !== 'uat'
        : localStorage.getItem('env') === 'prod'
    )
    const store = useStore()

    const getUserInfo = computed(() => {
      const { school_image = '', school_id = '' } =
        store.getters['user/getUserInfo'] || {}
      return { school_image, school_id }
    })
    const [register] = useModal()

    function handleLoginOut() {
      store.dispatch('user/confirmLoginOut')
    }

    function openAccount() {
      router.push({ name: 'Account' })
    }

    function handleMenuClick(e: { key: MenuEvent }) {
      switch (e.key) {
        case 'logout':
          handleLoginOut()
          break
        case 'account':
          openAccount()
          break
      }
    }

    const onImageError = (e: { target: HTMLImageElement }) =>
      (e.target.src = ErrorImage.SCHOOL)
    return {
      prefixCls,
      t,
      getUserInfo,
      handleMenuClick,
      getShowDoc,
      register,
      getUseLockPage,
      onImageError,
      isProduction,
    }
  },
})
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-header-school';

.@{prefix-cls} {
  height: @header-height;
  padding: 0 0 0 10px;
  padding-right: 10px;
  overflow: hidden;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  img {
    height: 100%;
    margin-right: 12px;
  }

  .text-danger {
    color: #ff7875;
  }

  &__header {
    color: #4a9df3;
    border-radius: 50%;
  }

  &__name {
    font-size: 14px;
    color: #4a9df3;
  }

  &--dark {
    &:hover {
      background-color: @header-dark-bg-hover-color;
    }
  }

  &--light {
    &:hover {
      background-color: @header-light-bg-hover-color;
    }

    .@{prefix-cls}__name {
      color: @text-color-base;
    }

    .@{prefix-cls}__desc {
      color: @header-light-desc-color;
    }
  }

  &-dropdown-overlay {
    .ant-dropdown-menu-item {
      min-width: 160px;
    }
  }
}
</style>
