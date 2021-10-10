<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form
      class="p-4 enter-x"
      :model="formData"
      :rules="getFormRules"
      ref="formRef"
    >
      <FormItem name="email" class="enter-x" v-show="step == 1">
        <Input
          size="large"
          v-model:value="formData.email"
          :placeholder="t('sys.login.userName')"
        />
      </FormItem>

      <FormItem name="code" class="enter-x" v-show="step == 2">
        <CountdownInput
          size="large"
          v-model:value="formData.code"
          placeholder="Mã gửi về email"
          :sendCodeApi="handleGetCode"
          text="Nhận lại mã"
        />
      </FormItem>

      <FormItem name="password" class="enter-x" v-show="step == 3">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.password"
          placeholder="Mật khẩu mới"
        />
      </FormItem>

      <FormItem name="password_confirmation" class="enter-x" v-show="step == 3">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.password_confirmation"
          placeholder="Xác nhận mật khẩu"
        />
      </FormItem>

      <FormItem class="enter-x">
        <Button
          type="primary"
          size="large"
          block
          @click="handleSubmit"
          :loading="loading"
        >
          {{ step == 3 ? 'Tạo mật khẩu mới' : 'Lấy lại mật khẩu ngay' }}
        </Button>
        <Button
          size="large"
          block
          class="mt-4"
          @click="handleResetStep"
          v-show="step != 1"
        >
          Nhập lại tài khoản
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
import LoginFormTitle from './LoginFormTitle.vue'
import { Form, Input, Button } from 'ant-design-vue'
import { CountdownInput } from '/@/components/CountDown'
import { useI18n } from '/@/hooks/web/useI18n'
import { useLoginState, useFormRules, LoginStateEnum } from './useLogin'
import {
  confirmForgotPassword,
  forgotPassword,
  changeForgotPassword,
} from '/@/api/sys/user'
import { useMessage } from '/@/hooks/web/useMessage'

export default defineComponent({
  name: 'ForgetPasswordForm',
  components: {
    Button,
    Form,
    FormItem: Form.Item,
    InputPassword: Input.Password,
    Input,
    CountdownInput,
    LoginFormTitle,
  },
  setup() {
    const { t } = useI18n()
    const { handleBackLogin, getLoginState } = useLoginState()
    const { getFormRules } = useFormRules()

    const { createMessage } = useMessage()
    const formRef = ref()
    const loading = ref(false)
    const isSendCode = ref<boolean>(false)
    const step = ref<number>(1)

    const formData = reactive({
      email: '',
      code: '',
      password: '',
      password_confirmation: '',
    })
    const enable = computed(
      () =>
        formData.email &&
        formData.code &&
        formData.password &&
        formData.password_confirmation
    )

    const getShow = computed(
      () => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD
    )

    async function handleReset() {
      const form = unref(formRef)
      if (!form) return
      await form.resetFields()
    }

    const handleResetStep = () => {
      step.value = 1
      handleReset()
    }

    const handleverifyCode = async () => {
      try {
        const params = toRaw(formData)
        loading.value = true
        await confirmForgotPassword(params)
        createMessage.success(
          'Xác minh tài khoản thành công! Hãy nhập mật khẩu mới của bạn'
        )
        return true
      } catch (err) {
        const errors = err?.response?.data?.errors || []
        const firstError = errors[Object.keys(errors)[0]][0] || err.toString()
        createMessage.error(firstError)
        return false
      } finally {
        loading.value = false
      }
    }

    const handleSubmit = async () => {
      if (step.value == 1) {
        if (!formData.email)
          return createMessage.error(
            'Hãy nhập email hoặc số điện thoại của bạn vào!'
          )
        const isComplete = await handleGetCode()
        if (isComplete) step.value = 2
        return
      }
      if (step.value == 2) {
        const isComplete = await handleverifyCode()
        if (isComplete) step.value = 3
        return
      }
      const params = toRaw(formData)
      loading.value = true
      try {
        await changeForgotPassword(params)
        handleBackLogin()
        createMessage.success('Lấy lại mật khẩu thành công! Đăng nhập ngay')
      } catch (err) {
        createMessage.error('Mã hoặc nhập lại mật khẩu không đúng')
      }
      loading.value = false
    }

    const handleGetCode = async () => {
      try {
        const phone = toRaw(formData.email)
        if (!phone) {
          createMessage.error('Hãy nhập email hoặc số điện thoại của bạn vào!')
          return false
        }
        loading.value = true
        await forgotPassword({ email: phone })
        isSendCode.value = true
        createMessage.success('Code đã được gửi vào email của bạn!')
        return true
      } catch (err) {
        createMessage.error(err.response.data.message || err.toString())
        return false
      } finally {
        loading.value = false
      }
    }

    return {
      t,
      formRef,
      formData,
      getFormRules,
      handleReset,
      loading,
      handleBackLogin,
      getShow,
      handleSubmit,
      handleGetCode,
      enable,
      isSendCode,
      step,
      handleResetStep,
    }
  },
})
</script>
