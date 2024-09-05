/** @jsx xml */
import xml from "@xmpp/xml"
import jid from "@xmpp/jid"

import { client } from './client'

let service = ''

const r = (room) => `${room}@${service}`

export async function init(svc) {
    service = svc
    if (!client) {
        throw Error("client is not initialized")
    }

    client.on("stanza", (stanza) => {
        if (stanza.is("message")) {
            const event = stanza.getChild("event", "http://jabber.org/protocol/pubsub#event")
            if (event) {
                const message = event.getChildByAttr("node", "urn:xmpp:mucsub:nodes:messages")
                    ?.getChild("item")
                    ?.getChild("message")
                if (message) {
                    client.emit("mucsub:message", message)
                    if (message.getAttr("type" == "groupchat")) {
                        const from = message.getAttr("from")
                        const to = message.getAttr("to")
                        client.emit("mucsub:message:groupchat", from, to, message.getChildText("body"))
                    }
                }
            }
        }
    })
}

export async function joinRoom(nick, room, password) {
    await client.iqCaller.set((
        <subscribe xmlns='urn:xmpp:mucsub:0'
            nick={nick}
            password={password}>
            <event node='urn:xmpp:mucsub:nodes:messages' />
            <event node='urn:xmpp:mucsub:nodes:subscribers' />
        </subscribe>
    ), r(room))
}

export async function leaveRoom(room) {
    await client.iqCaller.set((<unsubscribe xmlns='urn:xmpp:mucsub:0' />), r(room))
}

export async function sendGroupMsg(room, body) {
    const msg = (
        <message to={r(room)} type="groupchat">
            <body>{body}</body>
        </message>
    )
    await client.send(msg)
}

export async function getJoinedRooms() {
    let joinedRooms = []

    const ret = await client.iqCaller.get((<subscriptions xmlns='urn:xmpp:mucsub:0' />), service)
    if (ret.is("subscriptions", "urn:xmpp:mucsub:0")) {
        const subscriptions = ret.getChildren("subscription")
        for (const subscription of subscriptions) {
            const room = jid(subscription.getAttr("jid")).local
            const nick = subscription.getAttr("nick")
            joinedRooms.push({ room, nick })
        }
    } else {
        throw Error("failed to get joined rooms")
    }

    return joinedRooms
}

export async function getRoomMembers(room) {
    let members = []

    const ret = await client.iqCaller.get((<subscriptions xmlns='urn:xmpp:mucsub:0' />), r(room))
    if (ret.is("subscriptions", "urn:xmpp:mucsub:0")) {
        const subscriptions = ret.getChildren("subscription")
        for (const subscription of subscriptions) {
            const user = jid(subscription.getAttr("jid")).local
            const nick = subscription.getAttr("nick")
            members.push({ user, nick })
        }
    } else {
        throw Error("failed to get room members")
    }

    return members
}
