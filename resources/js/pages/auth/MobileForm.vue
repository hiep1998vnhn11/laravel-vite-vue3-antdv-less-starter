<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <FormItem name="mobile" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.phone"
          :placeholder="t('sys.login.mobile')"
        />
      </FormItem>
      <FormItem name="sms" class="enter-x">
        <Input
          size="large"
          v-model:value="formData.code"
          :placeholder="t('sys.login.smsCode')"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button
          type="primary"
          size="large"
          block
          @click="handleLogin"
          :loading="loading"
        >
          Xác minh
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed, unref, toRaw } from 'vue'

import { Form, Input, Button } from 'ant-design-vue'
import LoginFormTitle from './LoginFormTitle.vue'
import { useStore } from 'vuex'
import { useI18n } from '/@/hooks/web/useI18n'
import { useLoginState, useFormRules, LoginStateEnum } from './useLogin'
import { useMessage } from '/@/hooks/web/useMessage'

export default defineComponent({
  name: 'MobileForm',
  components: {
    Button,
    Form,
    FormItem: Form.Item,
    Input,
    LoginFormTitle,
  },
  setup() {
    const { t } = useI18n()
    const { handleBackLogin, getLoginState } = useLoginState()
    const { notification, createMessage } = useMessage()

    const { getFormRules } = useFormRules()
    const store = useStore()
    const formRef = ref()
    const loading = ref(false)

    const formData = reactive({
      phone: '',
      code: '',
    })

    const getShow = computed(
      () => unref(getLoginState) === LoginStateEnum.MOBILE
    )

    async function handleLogin() {
      if (!formData.phone || !formData.code) return
      try {
        loading.value = true
        const userInfo = await store.dispatch('user/verifySms', toRaw(formData))
        if (userInfo) {
          notification.success({
            message: t('sys.login.loginSuccessTitle'),
            description: `${t('sys.login.loginSuccessDesc')}: ${
              userInfo.fullname
            }`,
            duration: 3,
          })
        }
      } catch (err) {
        const errors = err?.response?.data?.errors || []
        const firstError = errors[Object.keys(errors)[0]][0] || err.toString()
        createMessage.error(firstError)
      } finally {
        loading.value = false
      }
    }

    return {
      t,
      formRef,
      formData,
      getFormRules,
      handleLogin,
      loading,
      handleBackLogin,
      getShow,
    }
  },
})
</script>
