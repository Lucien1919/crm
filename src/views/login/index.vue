<script lang="ts" setup>
import { reactive, ref } from "vue"
import type { Rule } from "ant-design-vue/es/form"
import type { FormInstance } from "ant-design-vue"
import { sha1 } from "@/utils/index"

const formRef = ref<FormInstance>()
const formState = reactive({
  name: "",
  password: "",
  verifiCode: undefined
})
const imgSource = () => {
  return import.meta.env.VITE_HOST + "captcha?"
}

const validatePass = async (_rule: Rule, value: string) => {
  if (value === "") {
    return Promise.reject("请输入密码")
  }
  return Promise.resolve()
}

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: "请输入账号", trigger: "change" }],
  password: [{ validator: validatePass, trigger: "change" }]
  // verifiCode: [{ required: true, trigger: "change" }]
}
const layout = {
  // labelCol: { span: 4 },
  wrapperCol: { span: 24 }
}
const handleFinish = (values: keyof typeof formState) => {
  console.log(sha1(formState.password))
}
const handleFinishFailed = (errors: any) => {
  console.log(errors)
}

onMounted(async () => {})
</script>
<template>
  <div class="login-page">
    <a-form
      class="login-page-form"
      ref="formRef"
      name="custom-validation"
      :model="formState"
      :rules="rules"
      v-bind="layout"
      @finish="handleFinish"
      @finishFailed="handleFinishFailed"
    >
      <a-form-item has-feedback name="name">
        <a-input size="large" v-model:value="formState.name" autocomplete="off" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item has-feedback name="password">
        <a-input-password size="large" v-model:value="formState.password" autocomplete="off" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item has-feedback name="verifiCode">
        <a-row>
          <a-col :span="12">
            <a-input size="large" v-model:value="formState.verifiCode" placeholder="请输入验证码" />
          </a-col>
          <a-col :span="10" :offset="2">
            <img class="login-page-form-img" :src="imgSource()" />
          </a-col>
        </a-row>
      </a-form-item>
      <a-form-item>
        <a-button size="large" class="login-page-form-btn" type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<style lang="less">
.login-page {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;

  &-form {
    width: 500px;
    margin: 0 auto;
    background: #fff;
    box-shadow: 0 0 36px 0 rgba(0, 0, 0, 0.09);
    border-radius: 20px;
    padding: 80px;
    &-img {
      // margin-top: 10px;
      width: 200px;
      height: 50px;
    }
    &-btn {
      width: 100%;
    }
  }
}
</style>
