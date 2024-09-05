import { ref } from "vue"
import { defineStore } from "pinia"
import { useAccountStore } from "./account"
import { client, setup, login, logout } from "../xmpp/client"
import * as mucsub from "../xmpp/mucsub"
import dayjs from "dayjs"

export const useUserStore = defineStore("user", () => {
    const accountStore = useAccountStore()

    const currentUserId = ref("")
    const jid = ref("")
    const status = ref("")
    const user = ref({})

    const currentPage = ref("chat")

    const debugMsg = ref([])

    const connectAndLogin = async (id) => {
        currentUserId.value = id
        user.value = accountStore.getAccount(id)

        await setup({
            service: "ws://localhost:5280/ws",

            username: user.value.username,
            password: user.value.password,
            domain: user.value.domain,
            resource: user.value.resource
        })

        client.on("debug:send", (msg) => {
            const time = dayjs().format("HH:mm:ss")
            debugMsg.value.push({ type: "send", time, msg })
        })
        client.on("debug:recv", (msg) => {
            const time = dayjs().format("HH:mm:ss")
            debugMsg.value.push({ type: "recv", time, msg })
        })

        client.on("online", () => {
            status.value = "online"
            accountStore.lastLoginId = currentUserId.value
        })

        jid.value = await login()

        await mucsub.init(`conference.${user.value.domain}`)

        console.log(`login success: ${jid.value}`)
    }

    const logoutAndDisconnect = async () => {
        await logout()
        status.value = "offline"
    }

    return { jid, status, user, currentPage, debugMsg, connectAndLogin, logoutAndDisconnect }
}, {
    persist: false
})