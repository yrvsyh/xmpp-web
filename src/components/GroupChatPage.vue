<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { client } from '../xmpp/client'
import GroupList from './GroupList.vue'
import GroupChat from './GroupChat.vue'
import { useUserStore } from '../store/user'

const userStore = useUserStore()

const selectedRoom = ref("")

const msgMap = ref({})

const roomList = computed(() => {
    return Object.keys(msgMap.value).map((room) => {
        const lastMsg = msgMap.value[room][msgMap.value[room].length - 1]
        return {
            room,
            lastMsg,
        }
    })
})

const msgList = computed(() => {
    if (!selectedRoom.value) return []
    return msgMap.value[selectedRoom.value] ||= []
})

watch(() => userStore.status, (n, o) => {
    if (n == "setup") {
        client.on("mucsub:message:groupchat", (group, nick, msg) => {
            const time = dayjs().format("HH:mm:ss")

            const msgList = msgMap.value[group] ||= []
            msgList.push({ nick, msg, time })
        })
    }
})

const onJoinRoomClicked = () => {
    const room = crypto.randomUUID().substring(0, 8)
    msgMap.value[room] = ["add room test"]
}

const onRoomSelected = (room) => {
    selectedRoom.value = room
}

onMounted(() => {
    msgMap.value
})

</script>

<template>
    <div class="w-full flex gap-2">
        <GroupList :roomList="roomList" @room-selected="onRoomSelected" @join-room-clicked="onJoinRoomClicked" />
        <GroupChat :room="selectedRoom" :msgList="msgList" />
    </div>
</template>