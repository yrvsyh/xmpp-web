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
    <div class="debug flex flex-col w-full h-full">
        <div class="min-h-12 py-2 px-4 border-b border-gray-300 flex items-center">
            Debug
        </div>
        <div class="overflow-auto mb-4">
            <div ref="debugContainer" class="message-container">
                <div v-for="msg in msgStore.getDebugMsgList()">
                    <div v-if="msg.type == 'send'" class="flex gap-2 p-2">
                        <div class="avatar"></div>
                        <div class="flex flex-col">
                            <div>{{ msg.time }}</div>
                            <div class="message" style="white-space: pre-wrap;">
                                {{ msg.msg }}
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex justify-end gap-2 p-2 w-full">
                        <div class="flex flex-col items-end w-full">
                            <div>{{ msg.time }}</div>
                            <div class="message" style="white-space: pre-wrap;">
                                {{ msg.msg }}
                            </div>
                        </div>
                        <div class="avatar"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.debug {
    border-radius: 8px;
    background-color: #fcfcfc;
    overflow: hidden;
}

.message-container {
    display: flex;
    flex-direction: column;
    padding: .5rem;
    background-color: #fcfcfc;
    border-radius: 8px;
}

.avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-image: url('../assets/avatar.png');
    background-size: cover;
}

.message {
    padding: .5rem;
    background-color: lightgray;
    border-radius: 8px;
    max-width: 80%;
}
</style>