<template>
    <div :class="prefixCls">
        <input v-model="search" />
        <span :class="`${prefixCls}__icon`">
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
        </span>
    </div>
</template>
<script lang="ts">
import { onMounted, ref, defineComponent } from 'vue'
import { useDesign } from '/@/hooks/web/useDesign'

export default defineComponent({
    name: 'AppSearchInput',
    setup() {
        const search = ref('')
        const { prefixCls } = useDesign('app-search-input')

        onMounted(() => {})
        return {
            prefixCls,
            search,
        }
    },
})
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-app-search-input';
.@{prefix-cls} {
    height: 43px;
    width: 286px;
    position: relative;
    color: #949782 !important;
    border-radius: 10px;
    @media screen and (max-width: 600px) {
        display: none;
    }

    input {
        position: absolute;
        height: 100%;
        width: 100%;
        border: none;
        padding-left: 48px;
        background: rgba(243, 243, 247, 1);
        border-radius: 10px;
        &:focus-visible {
            background: rgba(243, 243, 247, 0.7);
            outline: none;
        }
    }

    &__icon {
        top: -7px;
        left: 15px;
        position: absolute;
    }
}
</style>
