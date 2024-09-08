<script setup>
import { useUserStore } from './store/user'
import Sidebar from './components/Sidebar.vue'
import DebugPage from './components/DebugPage.vue'
import GroupChatPage from './components/GroupChatPage.vue'
import { useAppStore } from './store/app'

const appStore = useAppStore()

</script>

<template>
  <div class="w-full h-screen flex justify-center items-center">
    <div class="app w-[68rem] h-[48rem] flex">
      <Sidebar />

      <GroupChatPage v-show="appStore.currentPage == 'group'"></GroupChatPage>
      <DebugPage v-show="appStore.currentPage == 'debug'" />
    </div>
  </div>
</template>

<style scoped>
.app {
  /* background-color: #e8eff8; */
  background-color: #e4ecea;
  border-radius: 12px;
  border: 1px solid lightgray;
  box-shadow: 0px 0px 16px 4px lightgray;
  padding: 6px;
  gap: 6px;
}
</style>
