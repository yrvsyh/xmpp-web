<script setup>
import { NButton } from 'naive-ui'
import { computed, ref } from 'vue'
import mucsub from '../xmpp/mucsub'
import MessageList from './MessageList.vue'
import { useMsgStore } from '../store/msg'
import { useUserStore } from '../store/user'

const props = defineProps({
    room: Object,
})

const msgStore = useMsgStore()
const userStore = useUserStore()

const msgList = computed(() => {
    const msgs = msgStore.getGroupMsgList(props.room.name)
    return msgs.map((msg) => {
        return {
            ...msg,
            type: msg.username == props.room.nick ? "send" : "recv"
        }
    })
})

const msg = ref("")
const onSendClick = async () => {
    const message = {
        messageId: String(Date.now()),
        senderId: userStore.user.username,
        senderAvatar: "lib/asset/male_1.png",
        msgVersion: 0,
        text: msg.value,
    }
    await mucsub.sendGroupMsg(props.room.name, JSON.stringify(message))
    // await mucsub.sendGroupMsg(props.room.name, msg.value)
    msg.value = ""
}
const onEnterPressed = (e) => {
    if (e.which === 13 && !e.shiftKey) {
        e.preventDefault()
        onSendClick()
    }
}
</script>

<template>
    <div class="chat h-full flex flex-col p-2 w-full">
        <MessageList :msgList="msgList" />
        <!-- <div class="border-y border-gray-300" /> -->
        <div class="msg-input">
            <input v-model="msg" :onkeypress="onEnterPressed"></input>
            <NButton type="primary" size="small" @click="onSendClick">发送</NButton>
        </div>
    </div>
</template>
<style scoped>
.chat {
    background-color: #fcfcfc;
    border-radius: 8px;
}

.msg-input {
    margin: 0px;
    padding: .625rem .5rem .625rem 1rem;
    height: 3rem;
    border-radius: 8px;
    border: 1px solid lightgray;

    display: flex;
    align-items: center;
    gap: 1rem;
}

textarea,
input {
    font-size: 1rem;
    background-color: #fcfcfc;
    width: 100%;
    height: 100%;
    border: none;
    overflow: auto;
    outline: none;
    box-shadow: none;
    resize: none;
    /* caret-color: gray; */
}
</style>