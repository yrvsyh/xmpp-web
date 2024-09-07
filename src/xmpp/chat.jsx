/** @jsx xml */
import xml from "@xmpp/xml"
import jid from "@xmpp/jid"

import { client } from './client'


let domain = ""

const t = (to) => `${to}@${domain}`

export function init(d) {
    domain = d
}

export async function sendMessage(to, body) {
    client.send((
        <message to={t(to)} type="chat">
            <body>{body}</body>
        </message>
    ), to, body)
}