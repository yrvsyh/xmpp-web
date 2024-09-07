<script setup>
import { NButton } from 'naive-ui'
import { useUserStore } from '../store/user'

const emit = defineEmits(['roomSelected', 'joinRoomClicked'])

const props = defineProps({
    roomList: Array
})

</script>

<template>
    <div class="flex flex-col gap-2">
        <NButton @click="emit('joinRoomClicked')">
            加入群聊
        </NButton>
        <div class="h-full flex flex-col gap-2 overflow-auto">
            <div class="flex flex-col h-12 w-52 bg-slate-100 p-2 rounded cursor-pointer hover:bg-slate-200"
                @click="emit('roomSelected', room.room)" v-for="room in props.roomList">
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