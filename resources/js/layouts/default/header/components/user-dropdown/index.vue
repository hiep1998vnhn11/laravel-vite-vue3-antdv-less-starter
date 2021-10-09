<template>
    <div>
        <Dropdown
            placement="bottomLeft"
            :overlayClassName="`${prefixCls}-dropdown-overlay`"
        >
            <span :class="[prefixCls, `${prefixCls}--${theme}`]" class="flex">
                <img
                    :class="`${prefixCls}__header`"
                    src="/images/avatar.jpeg"
                />
                <span :class="`${prefixCls}__info md:block`">
                    <span :class="`${prefixCls}__name  `" class="truncate">
                        {{ getUserInfo.username }}
                    </span>
                </span>
            </span>
            <template #overlay>
                <Menu @click="handleMenuClick">
                    <MenuItem
                        key="account"
                        :text="t('layout.header.dropdownItemAccount')"
                        icon="ion:person-circle-outline"
                    />
                    <MenuDivider />
                    <MenuItem
                        key="logout"
                        :text="t('layout.header.dropdownItemLoginOut')"
                        icon="ion:power-outline"
                    />
                </Menu>
            </template>
        </Dropdown>
        <LockAction @register="register" />
    </div>
</template>
<script lang="ts">
// components
import { Dropdown, Menu } from 'ant-design-vue'

import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting'
import { useI18n } from '/@/hooks/web/useI18n'
import { useDesign } from '/@/hooks/web/useDesign'
import { useModal } from '/@/components/Modal'
import { useRouter } from 'vue-router'
import { propTypes } from '/@/utils/propTypes'
import { ErrorImage } from '/@/enums/imageEnum'
import { createAsyncComponent } from '/@/utils/factory/createAsyncComponent'

type MenuEvent = 'logout' | 'account'

export default defineComponent({
    name: 'UserDropdown',
    components: {
        Dropdown,
        Menu,
        MenuItem: createAsyncComponent(() => import('./DropMenuItem.vue')),
        MenuDivider: Menu.Divider,
        LockAction: createAsyncComponent(() => import('../lock/LockModal.vue')),
    },
    props: {
        theme: propTypes.oneOf(['dark', 'light']),
    },
    setup() {
        const router = useRouter()
        const { prefixCls } = useDesign('header-user-dropdown')
        const { t } = useI18n()
        const { getShowDoc, getUseLockPage } = useHeaderSetting()
        const store = useStore()

        const getUserInfo = computed(() => {
            const { username = '', avatar } =
                store.getters['user/getUserInfo'] || {}
            return {
                username,
                avatar: avatar || '/resource/img/header.jpg',
            }
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
        }
    },
})
</script>
<style lang="less">
@prefix-cls: ~'@{namespace}-header-user-dropdown';

.@{prefix-cls} {
    height: 41px;
    padding: 0 0 0 10px;
    padding-right: 10px;
    overflow: hidden;
    font-size: 12px;
    cursor: pointer;
    align-items: center;

    img {
        width: 24px;
        height: 24px;
        margin-right: 12px;
    }

    &__header {
        border-radius: 50%;
    }

    &__name {
        font-size: 14px;
        color: #111 !important;
        font-weight: 300;
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
