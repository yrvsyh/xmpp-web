<script setup>
import { computed, ref, watch } from 'vue'
import { useMsgStore } from '../store/msg'
import { useUserStore } from '../store/user'
import MessageList from './MessageList.vue'

const msgStore = useMsgStore()
const userStore = useUserStore()

// const msgList = ref([])
// watch(() => msgStore.getDebugMsgList(), async (n, o) => {
//     msgList.value = msgStore.getDebugMsgList()
// })

</script>

<template>
    <div class="debug flex flex-col w-full h-full">
        <div class="min-h-12 py-2 px-4 border-b border-gray-300 flex items-center">
            Debug {{ userStore.jid ? `(${userStore.jid})` : '' }}
        </div>
        <MessageList :msgList="msgStore.getDebugMsgList()" />
    </div>
</template>

<style scoped>
.debug {
    border-radius: 8px;
    background-color: #fcfcfc;
    overflow: hidden;
}
</style>