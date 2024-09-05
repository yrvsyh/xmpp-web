<script setup>
import { useUserStore } from './store/user'
import Sidebar from './components/Sidebar.vue'
import Debug from './components/Debug.vue'

const userStore = useUserStore()

</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="app w-[64rem] h-[48rem] flex gap-2 p-2">
      <Sidebar />

      <Debug v-if="userStore.currentPage == 'debug'" />
    </div>
  </div>
</template>

<style scoped>
.app {
  border-radius: 12px;
  box-shadow: 0px 0px 32px 2px rgba(128, 128, 128, 0.2);
}
</style>
