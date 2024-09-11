import { defineStore } from "pinia"
import { ref } from "vue"
import { client } from "../xmpp/client"
import dayjs from "dayjs"

export const useMsgStore = defineStore("msg", () => {
    const messageUserId = ref("")

    const debugMsgs = ref([])
    const normalMsgs = ref({})
    const groupMsgs = ref({})

    const saveMsg = () => {
        window.localStorage.setItem(
            `msg-${messageUserId.value}`,
            JSON.stringify({
                debugMsgs: debugMsgs.value,
                normalMsgs: normalMsgs.value,
                groupMsgs: groupMsgs.value,
            }),
        )
    }

    const loadMsg = () => {
        const msg = JSON.parse(
            window.localStorage.getItem(`msg-${messageUserId.value}`),
        )
        debugMsgs.value = msg?.debugMsgs ?? []
        normalMsgs.value = msg?.normalMsgs ?? {}
        groupMsgs.value = msg?.groupMsgs ?? {}
    }

    const init = (id) => {
        messageUserId.value = id
        if (!id) return
        window.addEventListener("beforeunload", () => {
            if (!messageUserId.value) return
            saveMsg()
        })

        client.on("debug:send", (msg) => {
            const time = dayjs().format("YYYY-MM-DD HH:mm:ss")
            newDebugMsg({ type: "send", time, msg })
        })
        client.on("debug:recv", (msg) => {
            const time = dayjs().format("YYYY-MM-DD HH:mm:ss")
            newDebugMsg({ type: "recv", time, msg })
        })

        client.on("mucsub:message:groupchat", (group, nick, msg) => {
            console.log("mucsub:message:groupchat", group, nick, msg)
            const time = dayjs().format("YYYY-MM-DD HH:mm:ss")
            newGroupMsg(group, { time, username: nick, msg })
        })
        if (messageUserId.value == id) return
        loadMsg()
    }

    const clear = () => {
        if (!messageUserId.value) return
        debugMsgs.value = []
        normalMsgs.value = {}
        groupMsgs.value = {}
        saveMsg()
    }

    const getDebugMsgList = () => {
        return debugMsgs.value
    }
    const newDebugMsg = (msg) => {
        getDebugMsgList().push(msg)
    }

    const getNormalMsgList = (jid) => {
        return (normalMsgs.value[jid] ||= [])
    }
    const newNormalMsg = (jid, msg) => {
        getNormalMsgList(jid).push(msg)
    }

    const getGroupLastMsg = (room) => {
        if (!groupMsgs.value[room]) return
        return groupMsgs.value[room][groupMsgs.value[room].length - 1]
    }
    const getGroupMsgList = (room) => {
        return (groupMsgs.value[room] ||= [])
    }
    const newGroupMsg = (room, msg) => {
        getGroupMsgList(room).push(msg)
    }

    return {
        messageUserId,

        init,
        clear,
        getDebugMsgList,
        newDebugMsg,
        getNormalMsgList,
        newNormalMsg,
        getGroupLastMsg,
        getGroupMsgList,
        newGroupMsg,
    }
})
