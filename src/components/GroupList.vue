<script setup>
import { NButton } from 'naive-ui'
import { useUserStore } from '../store/user'
import { computed, onMounted, ref } from 'vue'
import { useMsgStore } from '../store/msg'

const emit = defineEmits(['roomSelected', 'joinRoomClicked'])

const props = defineProps({
    roomList: Array
})

const selectedRoom = defineModel("selectedRoom", {
    type: Object,
    default: null,
})

const msgStore = useMsgStore()

const lastMsg = (room) => {
    const msgs = msgStore.getGroupMsgList(room.name)
    return msgs[msgs.length - 1]
}

const onItemClicked = (room) => {
    selectedRoom.value = room
    emit('roomSelected', room)
}
</script>

<template>
    <div class="contact-list flex flex-col gap-1">
        <!-- <NButton @click="emit('joinRoomClicked')">
            加入群聊
        </NButton> -->
        <div :class="['contact-item', 'flex', 'rounded', 'p-2', 'gap-4', 'h-14', { 'contact-item-active': room === selectedRoom }]"
            @click="onItemClicked(room)" v-for="room in props.roomList">
            <!-- <div class="flex items-start gap-4"> -->
            <div class="avatar">

            </div>
            <div class="flex flex-col min-w-0">
                <div>
                    {{ room.name }}
                </div>
                <div class="message-text" v-if="lastMsg(room)">
                    {{ lastMsg(room).username }}: {{ lastMsg(room).msg }}
                </div>
            </div>
            <!-- </div> -->
        </div>
    </div>
</template>

<style scoped>
.contact-list {
    width: 20rem;
    background-color: #fcfcfc;
    border-radius: 8px;
    padding: 4px;
}

.contact-item-active {
    background-color: #eaebeb;
}

.contact-item:hover {
    background-color: #eaebeb;
}

.avatar {
    width: 36px;
    height: 36px;
    flex: 0 0 36px;
    border-radius: 50%;
    background-image: url('../assets/avatar.png');
    background-size: cover;
    align-self: center;
}

.message-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>