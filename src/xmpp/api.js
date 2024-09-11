// 封装axios
import jid from "@xmpp/jid"
import axios from "axios"

const api = axios.create({
    // baseURL: "https://127.0.0.1:5443/api",
    baseURL: "/api",
    timeout: 5000,
    validateStatus: (code) => code >= 200 && code < 500,
})

api.interceptors.response.use((response) => {
    if (response.status == 200) {
        return response.data
    }
    return new Error(response.data)
})

export const getUserSubscriptions = async (user) => {
    const rooms = []

    const subscriptions = await api.post("/get_user_subscriptions", {
        user: user,
        host: "localhost",
    })
    for (const subscription of subscriptions) {
        rooms.push({
            name: jid(subscription.roomjid).local,
            nick: subscription.usernick,
        })
    }
    console.log(rooms)

    return rooms
}
