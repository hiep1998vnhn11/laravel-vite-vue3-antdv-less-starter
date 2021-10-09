<template>
    <div :class="prefixCls">
        <Loading
            :loading="loading.loading"
            absolute
            :tip="loading.tip"
        ></Loading>
    </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useDesign } from '/@/hooks/web/useDesign'
import { useStore } from 'vuex'
import { Loading } from '/@/components/Loading'
import { useGo } from '/@/hooks/web/usePage'
export default defineComponent({
    name: 'Login',
    components: {
        Loading,
    },
    props: {
        sessionTimeout: {
            type: Boolean,
        },
    },
    setup() {
        const loading = reactive({
            loading: true,
            tip: 'Logging you in ...',
        })
        const { prefixCls } = useDesign('login')
        const store = useStore()
        const go = useGo()
        const urlParams = new URLSearchParams(window.location.search)
        const token = urlParams.get('token')
        const envDB = urlParams.get('env')
        const doLogin = async () => {
            try {
                const params = { access_token: token, env: envDB || 'prod' }
                await store.dispatch('user/login', params)
            } catch (err) {
                loading.tip = 'Your request had been fail! Unauthorized!'
                window.location.href = 'https://edapt.education'
            } finally {
                loading.loading = true
            }
        }
        onMounted(async () => {
            if (token) {
                await doLogin()
            } else {
                window.location.href = 'https://edapt.education'
            }
        })

        return {
            prefixCls,
            loading,
        }
    },
})
</script>
