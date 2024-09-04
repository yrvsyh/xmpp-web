import { ref } from "vue"
import { defineStore } from "pinia"
import { useAccountStore } from "./account"
import { client, setup, login, logout } from "../xmpp/client"

export const useUserStore = defineStore("user", () => {
    const accountStore = useAccountStore()

    const currentUserId = ref("")
    const jid = ref("")
    const status = ref("")
    const user = ref({})

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

        client.on("online", () => {
            status.value = "online"
        })

        jid.value = await login()

        console.log(`login success: ${jid.value}`)
    }

    const logoutAndDisconnect = async () => {
        await logout()
        status.value = "offline"
    }

    return { jid, status, user, connectAndLogin, logoutAndDisconnect }
}, {
    persist: false
})