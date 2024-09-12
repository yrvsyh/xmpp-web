<script setup>
import { useUserStore } from "./store/user"
import Sidebar from "./components/Sidebar.vue"
import DebugPage from "./components/DebugPage.vue"
import GroupChatPage from "./components/GroupChatPage.vue"
import { useAppStore } from "./store/app"
import { onMounted } from "vue"

const appStore = useAppStore()

// let handle = null
// let isDragging = false
// let x = 0
// let y = 0
// onMounted(() => {
//     const app = document.querySelector(".app")
//     app.onmousedown = (e) => {
//         if (e.target.id != "app") return
//         isDragging = true
//         handle = window.onmousemove = (e) => {
//             if (isDragging) {
//                 x += e.movementX
//                 if (x < 0) x = 0
//                 y += e.movementY
//                 if (y < 0) y = 0
//                 app.style.left = x + "px"
//                 app.style.top = y + "px"
//             }
//         }
//     }
//     window.onmouseup = (e) => {
//         isDragging = false
//         if (handle) {
//             window.removeEventListener("mousemove", handle)
//             handle = null
//         }
//     }
// })
</script>

<template>
    <!-- <div class="w-full h-screen flex justify-center items-center"> -->
    <div class="w-full h-screen">
        <div id="app" class="app flex">
            <Sidebar />

            <GroupChatPage
                v-show="appStore.currentPage == 'group'"
            ></GroupChatPage>
            <DebugPage v-show="appStore.currentPage == 'debug'" />
        </div>
    </div>
</template>

<style scoped>
.app {
    /* background-color: #e8eff8; */
    background-color: #e4ecea;
    border-radius: 12px;
    border: 1px solid lightgray;
    box-shadow: 0px 0px 16px 4px lightgray;
    padding: 8px;
    gap: 6px;

    width: 100%;
    height: 100%;

    /* position: absolute; */
    /* resize: both; */

    min-width: 48rem;
    min-height: 32rem;
}
</style>
