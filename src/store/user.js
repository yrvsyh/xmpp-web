import { ref, watchEffect } from "vue"
import { defineStore } from "pinia"
import { useAccountStore } from "./account"
import { client, setup, login, logout } from "../xmpp/client"
import { useAppStore } from "./app"
import { useMsgStore } from "./msg"

export const useUserStore = defineStore(
    "user",
    () => {
        const appStore = useAppStore()
        const accountStore = useAccountStore()
        const msgStore = useMsgStore()

        const jid = ref("")
        const user = ref({})
        const status = ref("")

        watchEffect(() => {
            document.title = `XMPP Web - ${jid.value || ""}`
        })

        const connectAndLogin = async (id) => {
            user.value = accountStore.getAccount(id)

            await setup({
                service: "ws://localhost:5280/ws",
                username: user.value.username,
                password: user.value.password,
                domain: user.value.domain,
                resource: user.value.resource,
            })

            client.on("status", (s) => {
                status.value = s
            })

            client.on("online", () => {
                appStore.currentUserId = id
            })

            msgStore.init(id)

            try {
                jid.value = await login()
            } catch (error) {
                msgStore.init(null)
            }

            console.log(`login success: ${jid.value}`)
        }

        const logoutAndDisconnect = async () => {
            await logout()
            jid.value = null
            msgStore.clear()
        }

        if (appStore.currentUserId) {
            connectAndLogin(appStore.currentUserId)
        }

        return {
            jid,
            status,
            user,

            connectAndLogin,
            logoutAndDisconnect,
        }
    },
    {
        persist: false,
    },
)
