import xmpp from '@xmpp/client'
import jid from '@xmpp/jid'
import { ref } from "vue"

export const useXmppStore = defineStore("xmpp", () => {
    /**
     * @type {xmpp.Client | undefined}
     */
    const c = null
    const client = ref(c)

    const currentJid = ref(jid())

    const initHandler = async (client) => {
        client.on("send", (el) => {
            client.emit("debug:send", pp(el))
        })

        client.on("stanza", (el) => {
            client.emit("debug:recv", pp(el))
        })

        client.on("nonza", (el) => {
            client.emit("debug:recv", pp(el))
        })

        client.on("error", (error) => {
            client.emit("debug:error", error)
        })
    }

    const setup = async (config) => {
        if (client.value && client.value.status != "disconnect") {
            await client.value.stop()
        }

        client.value = xmpp.client(config)

        await initHandler(client.value)
        await mucsub.init(`conference.${config.domain}`)
    }

    const login = async () => {
        const sendOnlinePresence = () => {
            return new Promise((resolve, reject) => {
                client.value.once("online", () => {
                    client.value.send(xmpp.xml("presence"))
                        .then(resolve).catch(reject)
                })
            })
        }
        currentJid.value = await client.value.start()
        await sendOnlinePresence()
    }

    const logout = async () => {
        await client.value.stop()
    }

    const C = () => client.value

    return {
        setup,
        login,
        logout,
        C,
    }
})