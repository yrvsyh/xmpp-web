<script setup>
import { Icon } from '@vicons/utils'
import { Chat20Filled, Chat20Regular, ChatMultiple20Regular, ChatMultiple20Filled, Settings20Filled, CodeCircle20Filled, CodeCircle20Regular, Settings20Regular, SignOut20Regular, SignOut20Filled } from '@vicons/fluent'
import { useUserStore } from '../store/user'
import { ref } from 'vue'
import Login from './Login.vue'
import { useAppStore } from '../store/app'

const userStore = useUserStore()
const appStore = useAppStore()

const showLogin = ref(false)

const onUserLogin = (id) => {
    userStore.connectAndLogin(id)
}

</script>

<template>
    <div class="sidebar flex flex-col items-center">
        <div class="avatar" @click="showLogin = true">

        </div>
        <div class="pages flex flex-col items-center gap-4">
            <Icon class="icon" size="32" @click="appStore.currentPage = 'chat'">
                <div v-if="appStore.currentPage == 'chat'">
                    <Chat20Filled color="#18a058" />
                </div>
                <div v-else>
                    <Chat20Regular class="regular-icon" color="#18a058" />
                    <Chat20Filled class="filled-icon" color="#18a058" />
                </div>
            </Icon>
            <Icon class="icon" size="32" @click="appStore.currentPage = 'group'">
                <div v-if="appStore.currentPage == 'group'">
                    <ChatMultiple20Filled color="#18a058" />
                </div>
                <div v-else>
                    <ChatMultiple20Regular class="regular-icon" color="#18a058" />
                    <ChatMultiple20Filled class="filled-icon" color="#18a058" />
                </div>
            </Icon>
            <Icon class="icon" size="32" @click="appStore.currentPage = 'debug'">
                <div v-if="appStore.currentPage == 'debug'">
                    <CodeCircle20Filled color="#18a058" />
                </div>
                <div v-else>
                    <CodeCircle20Regular class="regular-icon" color="#18a058" />
                    <CodeCircle20Filled class="filled-icon" color="#18a058" />
                </div>
            </Icon>
        </div>
        <div class="flex flex-col gap-4">
            <Icon class="icon" size="28" @click="appStore.currentPage = 'setting'">
                <div v-if="appStore.currentPage == 'setting'">
                    <Settings20Filled color="#18a058" />
                </div>
                <div v-else>
                    <Settings20Regular class="regular-icon" color="#18a058" />
                    <Settings20Filled class="filled-icon" color="#18a058" />
                </div>
            </Icon>
            <Icon class="icon" size="28" @click="userStore.logoutAndDisconnect">
                <div>
                    <SignOut20Regular class="regular-icon" color="#18a058" />
                    <SignOut20Filled class="filled-icon" color="#18a058" />
                </div>
            </Icon>
        </div>
    </div>
    <Login v-model:show="showLogin" @on-login="onUserLogin" />
</template>

<style scoped>
.sidebar {
    border-radius: 8px;
    box-shadow: 0px 0px 12px 1px rgba(128, 128, 128, 0.1);
    width: 56px;
    padding: 10px 12px 10px 10px;
}

.avatar {
    width: 36px;
    height: 36px;
    flex: 0 0 36px;
    border-radius: 50%;
    background-image: url('../assets/avatar.png');
    background-size: cover;
}

.pages {
    margin-top: 28px;
    width: 36px;
    height: max-content;
    flex: 1 0 36px;
}

.icon .regular-icon {
    display: block;
}

.icon .filled-icon {
    display: none;
}

.icon:hover .regular-icon {
    display: none;
}

.icon:hover .filled-icon {
    display: block;
}
</style>