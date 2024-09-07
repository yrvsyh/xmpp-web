import { ref } from "vue"
import { defineStore } from "pinia"
import { useAccountStore } from "./account"
import { client, setup, login, logout } from "../xmpp/client"
import * as mucsub from "../xmpp/mucsub"
import dayjs from "dayjs"
import { useAppStore } from "./app"
import { useMsgStore } from "./msg"

export const useUserStore = defineStore("user", () => {
    const appStore = useAppStore()
    const accountStore = useAccountStore()
    const msgStore = useMsgStore()

    const jid = ref("")
    const user = ref({})
    const status = ref("")

    const connectAndLogin = async (id) => {
        user.value = accountStore.getAccount(id)

        await setup({
            service: "ws://localhost:5280/ws",
            username: user.value.username,
            password: user.value.password,
            domain: user.value.domain,
            resource: user.value.resource
        })

        client.on('status', (s) => {
            status.value = s
        })

        client.on("debug:send", (msg) => {
            const time = dayjs().format("HH:mm:ss")
            msgStore.newDebugMsg({ type: "send", time, msg })
        })
        client.on("debug:recv", (msg) => {
            const time = dayjs().format("HH:mm:ss")
            msgStore.newDebugMsg({ type: "recv", time, msg })
        })

        client.on("online", () => {
            appStore.currentUserId = id
        })

        jid.value = await login()

        console.log(`login success: ${jid.value}`)

        msgStore.setCurrentId(id)
    }

    const logoutAndDisconnect = async () => {
        await logout()
        msgStore.setCurrentId("")
    }

    if (appStore.currentUserId) {
        connectAndLogin(appStore.currentUserId)
    }

    return {
        jid,
        status,
        user,

        connectAndLogin,
        logoutAndDisconnect
    }
}, {
    persist: false
})