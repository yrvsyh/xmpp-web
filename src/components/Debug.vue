<script setup>
import { nextTick, onMounted, ref, toRef, watch, watchEffect } from 'vue'
import { client } from '../xmpp/client'
import { useUserStore } from '../store/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { debugMsg: msgList } = storeToRefs(userStore)

const debugContainer = ref(null)
watch(() => userStore.debugMsg.length, () => {
    nextTick(() => {
        debugContainer.value.scrollTop = debugContainer.value.scrollHeight
    })
}, { deep: true })

onMounted(() => {
    debugContainer.value.scrollTop = debugContainer.value.scrollHeight
})
</script>

<template>
    <div ref="debugContainer" class="debug w-full h-full flex flex-col overflow-auto p-2">
        <div v-for="msg in msgList">
            <div class="bg-gray-200 p-2 rounded-md" style="white-space: pre-wrap;">
                {{ `${msg.time} ${msg.type}:\n\n${msg.msg}` }}
            </div>
            <br>
        </div>
    </div>
</template>

<style scoped>
.debug {
    border-radius: 8px;
    box-shadow: 0px 0px 12px 1px rgba(128, 128, 128, 0.1);
}
</style>