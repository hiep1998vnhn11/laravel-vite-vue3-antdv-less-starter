<template>
    <div class="anticon" :class="getAppLogoClass" @click="goHome">
        <img src="/images/firstdata-logo.svg" />
        <span :class="getTitleClass"> Dashboard </span>
    </div>
</template>
<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import { useGlobSetting } from '/@/hooks/setting'
import { useGo } from '/@/hooks/web/usePage'
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting'
import { useDesign } from '/@/hooks/web/useDesign'
import { PageEnum } from '/@/enums/pageEnum'

const props = {
    theme: {
        type: String,
        validator: (v: string) => ['light', 'dark'].includes(v),
    },
    showTitle: { type: Boolean, default: true },
    alwaysShowTitle: { type: Boolean },
}

export default defineComponent({
    name: 'AppLogo',
    props: props,
    setup(props) {
        const { prefixCls } = useDesign('app-logo')
        const { getCollapsedShowTitle, getCollapsed } = useMenuSetting()
        const { title } = useGlobSetting()
        const go = useGo()
        const getAppLogoClass = computed(() => [
            prefixCls,
            props.theme,
            {
                'collapsed-show-title': unref(getCollapsedShowTitle),
                collapsed: unref(getCollapsed),
            },
        ])

        const getTitleClass = computed(() => [
            `${prefixCls}__text`,
            {
                'xs:opacity-0': !props.alwaysShowTitle,
            },
        ])
        const getSrc = computed(() =>
            !unref(getCollapsed) ? '/edapt-logo.png' : '/favicon.png'
        )

        function goHome() {
            go(PageEnum.BASE_HOME)
        }

        return {
            getAppLogoClass,
            getTitleClass,
            getCollapsedShowTitle,
            goHome,
            title,
            prefixCls,
            getSrc,
        }
    },
})
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-app-logo';

.@{prefix-cls} {
    display: flex;
    align-items: center;
    padding-left: 40px;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
    &.collapsed {
        padding: 0;
        justify-content: center;
    }
    &.collapsed &__text {
        display: none;
    }

    &__text {
        margin-left: 12px;
        font-size: 1.1rem;
        font-weight: bold;
        color: black;
        font-weight: 700;
        transition: all 0.5s;
    }

    &.light {
        border-bottom: 1px solid @border-color-base;
    }

    &.collapsed-show-title {
        padding-left: 20px;
    }

    &.light &__title {
        color: @primary-color;
    }

    &.dark &__text {
        color: @white;
    }
}
</style>
