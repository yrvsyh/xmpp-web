<script setup>
import { watch, ref, nextTick } from 'vue'

const props = defineProps(['selectedRoom', 'msgList'])

const groupChatContainer = ref(null)

watch(() => props.msgList.length, () => {
    nextTick(() => {
        groupChatContainer.value.scrollTop = groupChatContainer.value.scrollHeight
    })
}, { deep: true })

</script>

<template>
    <div ref="groupChatContainer" class="debug w-full h-full flex flex-col overflow-auto p-2">
        <div v-for="msg in msgList">
            <div class="bg-gray-200 p-2 rounded-md" style="white-space: pre-wrap;">
                {{ msg.nick }}:
                {{ msg.msg }}
            </div>
            <br>
        </div>
    </div>
</template>