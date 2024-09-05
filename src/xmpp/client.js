import xmlFormat from 'xml-formatter'
import xmpp from '@xmpp/client'
import { init } from './mucsub'

/**
 * @type {xmpp.Client | undefined}
 */
export let client = undefined

const pp = (el) => {
    return xmlFormat(el.toString(), { indentation: '  ' })
}

export async function setup(config) {
    if (client && client.status != "disconnect") {
        await client.stop()
    }

    client = xmpp.client(config)

    client.on("send", (el) => {
        client.emit("debug:send", pp(el))
        console.log(`<< send <<\n${pp(el)}\n`)
    })

    client.on("stanza", (el) => {
        client.emit("debug:recv", pp(el))
        console.log(`>> recv >>\n${pp(el)}\n`)
    })

    client.on("nonza", (el) => {
        client.emit("debug:recv", pp(el))
        console.log(`>> recv >>\n${pp(el)}\n`)
    })

    client.on("error", (error) => {
        client.emit("debug:error", error)
        console.log(`>> error <<\n${error}\n`)
    })

    await init(`conference.${config.domain}`)

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