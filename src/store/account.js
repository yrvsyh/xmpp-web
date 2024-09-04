import { ref } from "vue"
import { defineStore } from "pinia"

export const useAccountStore = defineStore("account", () => {
    const accounts = ref({})

    const defaultAccount = {
        name: "",
        password: "",
        domain: "localhost",
        host: "localhost",
        port: 5222,
        resource: "web",
        ssl: true
    }
    const getAccount = (id) => {
        return accounts.value[id] ?? defaultAccount
    }

    const saveAccount = (account) => {
        if (account.id) {
            accounts.value[account.id] = account
        }
    }

    const updateAccount = (id, account) => {
        if (accounts.value[id]) {
            accounts.value[id] = { ...accounts.value[id], ...account }
        }
    }

    const deleteAccount = (id) => {
        delete accounts.value[id]
    }

    return { accounts, getAccount, saveAccount, updateAccount, deleteAccount }
}, { persist: true })