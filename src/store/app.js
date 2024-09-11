import { defineStore } from "pinia"
import { ref } from "vue"

export const useAppStore = defineStore(
    "app",
    () => {
        const settings = ref({
            width: 800,
            height: 600,
        })

        const currentUserId = ref("")
        const currentPage = ref("chat")

        return {
            currentUserId,
            currentPage,
        }
    },
    {
        persist: {
            storage: sessionStorage,
        },
    },
)
