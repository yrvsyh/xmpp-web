<script setup>
import { nextTick, onMounted, onUpdated, ref, watch } from 'vue'

const props = defineProps({
    msgList: Array
})

const messageListView = ref(null)
onUpdated(() => {
    nextTick(() => {
        console.log("onUpdated")
        messageListView.value.scrollTop = messageListView.value.scrollHeight
    })
})
</script>

<template>
    <div ref="messageListView" class="overflow-y-auto mb-4 h-full w-full">
        <div v-for="msg in props.msgList" class="p-2">
            <div v-if="msg.type == 'recv'" class="flex gap-4 p-2">
                <div class="avatar"></div>
                <div class="flex flex-col gap-2">
                    <div>
                        <span v-if="msg.username">{{ msg.username }}</span>
                        <span v-else>{{ msg.time }}</span>
                    </div>
                    <p class="message">{{ msg.msg }}</p>
                </div>
            </div>
            <div v-else class="flex justify-end gap-4 p-2">
                <div class="flex flex-col items-end gap-2">
                    <div>
                        <span v-if="msg.username">{{ msg.username }}</span>
                        <span v-else>{{ msg.time }}</span>
                    </div>
                    <p class="message">{{ msg.msg }}</p>
                </div>
                <div class="avatar"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-image: url('../assets/avatar.png');
    background-size: cover;
    flex: 0 0 36px;
}

.message {
    padding: .5rem;
    background-color: rgb(237, 237, 237);
    border-radius: 8px;

    max-width: 100%;

    white-space: pre-wrap;
    word-wrap: break-word;
    /* word-break: break-all; */
}
</style>
