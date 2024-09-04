<script setup>
import { ref } from 'vue'
import { NButton } from 'naive-ui'
import Login from './components/Login.vue'
import { useUserStore } from './store/user'

const userStore = useUserStore()

const show = ref(false)

const onUserLogin = (id) => {
  userStore.connectAndLogin(id)
}
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center bg-gray-200">
    <div class="w-[48rem] h-[32rem] bg-slate-50 rounded-lg shadow-lg">
      <NButton @click="show = true">测试</NButton>
      <Login v-model:show="show" @on-login="onUserLogin" />
      <span v-if="userStore.status == 'online'">登录成功</span>
    </div>
  </div>
</template>

<style scoped></style>
