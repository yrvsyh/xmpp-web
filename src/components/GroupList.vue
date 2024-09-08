<script setup>
import { NButton } from 'naive-ui'
import { useUserStore } from '../store/user'
import { onMounted, ref } from 'vue'

const emit = defineEmits(['roomSelected', 'joinRoomClicked'])

const props = defineProps({
    roomList: Array
})

const onItemClicked = (target) => {
    emit('roomSelected', target)
}
</script>

<template>
    <div class="contact-list flex flex-col gap-2">
        <!-- <NButton @click="emit('joinRoomClicked')">
            加入群聊
        </NButton> -->
        <div class="h-full flex flex-col gap-1 overflow-auto">
            <div class="flex flex-col h-12 p-2 rounded cursor-pointer" @click="emit('roomSelected', room.room)"
                v-for="room in props.roomList">
                <div>
                    {{ room.room }} {{ room.lastMsg.time }}
                </div>
                <div>
                    {{ room.lastMsg.nick }}:
                    {{ room.lastMsg.msg }}
                </div>
            </div>
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

.contact-item-active {}

.contact-item:hover {
    background-color: #eaebeb;
}
</style>