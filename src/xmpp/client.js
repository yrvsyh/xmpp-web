import xmpp from '@xmpp/client'

export let client = undefined

export async function setup(config) {
    if (client && client.status != "disconnect") {
        await client.stop()
    }

    client = xmpp.client(config)

    client.on("online", (jid) => {
        console.log("xmpp:online:", jid)
    })

    client.on("offline", (status) => {
        console.log("xmpp:offline:", status)
    })

    client.on("stanza", (stanza) => {
        console.log("xmpp:stanza:", stanza)
    })

    client.on("error", (error) => {
        console.log("xmpp:error:", error)
    })

    return client
}

export async function login() {
    client.once("online", () => {
        client.send(xmpp.xml("presence"))
    })
    let jid = await client.start()
    await client.send(xmpp.xml("presence"))
    return jid
}

export async function logout() {
    await client.stop()
}