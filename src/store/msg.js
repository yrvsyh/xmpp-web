import { defineStore } from "pinia"
import { ref } from "vue"

export const useMsgStore = defineStore("msg", () => {
    const messageUserId = ref("")

    const setCurrentId = (id) => {
        console.log("setCurrentId:", id, "last:", messageUserId.value)
        // 另一个用户登录，清除上一个用户的聊天记录
        if (id != messageUserId.value) {
            debugMsgs.value = []
            normalMsgs.value = {}
            groupMsgs.value = {}
        }
        messageUserId.value = id
    }

    const debugMsgs = ref([])
    const normalMsgs = ref({})
    const groupMsgs = ref({})

    const getDebugMsgList = () => {
        return debugMsgs.value
    }
    const newDebugMsg = (msg) => {
        getDebugMsgList().push(msg)
    }

    const getNormalMsgList = (jid) => {
        return normalMsgs.value[jid] ||= []
    }
    const newNormalMsg = (jid, msg) => {
        getNormalMsgList(jid).push(msg)
    }

    const getGroupMsgList = (room) => {
        return groupMsgs.value[room] ||= []
    }
    const newGroupMsg = (room, msg) => {
        getGroupMsgList(room).push(msg)
    }

    return {
        messageUserId,
        debugMsgs,
        normalMsgs,
        groupMsgs,

        setCurrentId,
        getDebugMsgList,
        newDebugMsg,
        getNormalMsgList,
        newNormalMsg,
        getGroupMsgList,
        newGroupMsg,
    }
}, { persist: true })