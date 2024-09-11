<script setup>
import { computed, ref, watch } from 'vue'
import GroupList from './GroupList.vue'
import GroupChat from './GroupChat.vue'
import { useUserStore } from '../store/user'
import { useMsgStore } from '../store/msg'
import { getUserSubscriptions } from '../xmpp/api'

const userStore = useUserStore()
const msgStore = useMsgStore()

const selectedRoom = ref({})

const roomList = ref([])

watch(() => userStore.jid, async (n, o) => {
    if (n) {
        roomList.value = await getUserSubscriptions(n.local)
    } else {
        roomList.value = []
    }
})

// const roomList = computed(async () => {
//     console.log(userStore.jid.local)
//     return await getUserSubscriptions('yzy')
// })

const onJoinRoomClicked = () => {
    const room = crypto.randomUUID().substring(0, 8)
}
</script>

<template>
    <div class="group-chat-page flex gap-2 w-full">
        <GroupList :roomList="roomList" v-model:selectedRoom="selectedRoom" @join-room-clicked="onJoinRoomClicked" />
        <GroupChat :room="selectedRoom" />
    </div>
</template>

<style scoped>
.group-chat-page {}
</style>