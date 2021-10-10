<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />
  <Form
    class="p-4 enter-x"
    :model="formData"
    :rules="getFormRules"
    ref="formRef"
    v-show="getShow"
    @keypress.enter="handleLogin"
  >
    <FormItem name="account" class="enter-x">
      <Input
        size="large"
        v-model:value="formData.account"
        :placeholder="t('sys.login.userName')"
      />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        :placeholder="t('sys.login.password')"
      />
    </FormItem>

    <ARow class="enter-x">
      <ACol :span="12">
        <FormItem>
          <Checkbox v-model:checked="rememberMe" size="small">
            {{ t('sys.login.rememberMe') }}
          </Checkbox>
        </FormItem>
      </ACol>
      <ACol :span="12">
        <FormItem :style="{ 'text-align': 'right' }">
          <Button
            type="link"
            size="small"
            @click="setLoginState(LoginStateEnum.RESET_PASSWORD)"
          >
            {{ t('sys.login.forgetPassword') }}
          </Button>
        </FormItem>
      </ACol>
    </ARow>

    <FormItem class="enter-x">
      <Button
        type="primary"
        size="large"
        block
        @click="handleLogin"
        :loading="loading"
      >
        {{ t('sys.login.loginButton') }}
      </Button>
    </FormItem>

    <ARow class="enter-x">
      <ACol :xs="24" :md="12">
        <Button block @click="setLoginState(LoginStateEnum.MOBILE)">
          Xác minh tài khoản
        </Button>
      </ACol>
    </ARow>
  </Form>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRaw, unref, computed } from 'vue'

import {
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Button,
  Divider,
} from 'ant-design-vue'
import { GoogleCircleFilled, TwitterCircleFilled } from '@ant-design/icons-vue'
import LoginFormTitle from './LoginFormTitle.vue'

import { useI18n } from '/@/hooks/web/useI18n'
import { useMessage } from '/@/hooks/web/useMessage'

import { useStore } from 'vuex'
import {
  LoginStateEnum,
  useLoginState,
  useFormRules,
  useFormValid,
} from './useLogin'
import { useDesign } from '/@/hooks/web/useDesign'

export default defineComponent({
  name: 'LoginForm',
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    Checkbox,
    Button,
    Form,
    FormItem: Form.Item,
    Input,
    Divider,
    LoginFormTitle,
    InputPassword: Input.Password,
    GoogleCircleFilled,
    TwitterCircleFilled,
  },
  setup() {
    const { t } = useI18n()
    const { notification, createErrorModal } = useMessage()
    const { prefixCls } = useDesign('login')
    const store = useStore()

    const { setLoginState, getLoginState } = useLoginState()
    const { getFormRules } = useFormRules()

    const formRef = ref()
    const loading = ref(false)
    const rememberMe = ref(false)

    const formData = reactive({
      account: '',
      password: '',
    })

    const { validForm } = useFormValid(formRef)

    const getShow = computed(
      () => unref(getLoginState) === LoginStateEnum.LOGIN
    )

    async function handleLogin() {
      const data = await validForm()
      if (!data) return
      try {
        loading.value = true
        const userInfo = await store.dispatch(
          'user/login',
          toRaw({
            password: data.password,
            email: data.account,
            mode: 'none',
          })
        )
        if (userInfo) {
          notification.success({
            message: t('sys.login.loginSuccessTitle'),
            description: `${t('sys.login.loginSuccessDesc')}: ${
              userInfo.fullname
            }`,
            duration: 3,
          })
        }
      } catch (error) {
        console.log(error)
        createErrorModal({
          title: t('sys.api.errorTip'),
          content: 'Số điện thoại hoặc mật khẩu không đúng!',
          getContainer: () =>
            document.body.querySelector(`.${prefixCls}`) || document.body,
        })
      } finally {
        loading.value = false
      }
    }

    return {
      t,
      prefixCls,
      formRef,
      formData,
      getFormRules,
      rememberMe,
      handleLogin,
      loading,
      setLoginState,
      LoginStateEnum,
      getShow,
    }
  },
})
</script>
