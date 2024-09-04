import { defineStore } from "pinia"
import { ref } from "vue"

export const useAppStore = defineStore("app", () => {
    const settings = ref({
        width: 800,
        height: 600,
    })

    const count = ref(0)

    const getCount = () => {
        return count.value
    }

    const increment = () => {
        count.value++
    }

    return { settings, count, getCount, increment }
}, { persist: true })