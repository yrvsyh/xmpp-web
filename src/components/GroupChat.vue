<script setup>
import { NButton, NList, NListItem } from 'naive-ui'
import { ref } from 'vue'
import mucsub from '../xmpp/mucsub'

const props = defineProps({
    selectedRoom: String,
    msgList: Object,
})

const msg = ref("")
const onSendClick = async () => {
    mucsub.sendGroupMsg(props.selectedRoom, msg.value)
}
const onEnterPressed = (e) => {
    if (e.which === 13 && !e.shiftKey) {
        e.preventDefault()
        onSendClick()
    }
}
</script>

<template>
    <div class="chat h-full w-full flex flex-col p-2">
        <div class="h-full">
            <n-list>
                <n-list-item v-for="msg in props.msgList">
                    {{ msg.body }}
                </n-list-item>
            </n-list>
        </div>
        <!-- <div class="border-y border-gray-300" /> -->
        <div class="msg-input">
            <input v-model="msg" :onkeypress="onEnterPressed"></input>
            <NButton type="primary" @click="onSendClick">发送</NButton>
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