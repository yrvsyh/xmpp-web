<script setup>
import { onUpdated, ref } from 'vue'
import { useMsgStore } from '../store/msg'

const msgStore = useMsgStore()

const debugContainer = ref(null)
onUpdated(() => {
    debugContainer.value.scrollTop = debugContainer.value.scrollHeight
})

</script>

<template>
    <div ref="debugContainer" class="debug w-full h-full flex flex-col overflow-auto p-2">
        <div v-for="msg in msgStore.getDebugMsgList()">
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