<script setup>
import { Icon } from '@vicons/utils'
import { Chat20Filled, Chat20Regular, ChatMultiple20Regular, ChatMultiple20Filled, Settings20Filled, CodeCircle20Filled, CodeCircle20Regular } from '@vicons/fluent'
import { useUserStore } from '../store/user'
import { ref } from 'vue'
import Login from './Login.vue'

const userStore = useUserStore()

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
            <Icon class="icon" size="32" @click="userStore.currentPage = 'chat'">
                <div v-if="userStore.currentPage == 'chat'">
                    <Chat20Filled color="#18a058" />
                </div>
                <div v-else>
                    <Chat20Regular class="regular-icon" color="#18a058" />
                    <Chat20Filled class="filled-icon" color="#18a058" />
                </div>
            </Icon>
            <Icon class="icon" size="32" @click="userStore.currentPage = 'group'">
                <div v-if="userStore.currentPage == 'group'">
                    <ChatMultiple20Filled color="#18a058" />
                </div>
                <div v-else>
                    <ChatMultiple20Regular class="regular-icon" color="#18a058" />
                    <ChatMultiple20Filled class="filled-icon" color="#18a058" />
                </div>
            </Icon>
            <Icon class="icon" size="32" @click="userStore.currentPage = 'debug'">
                <div v-if="userStore.currentPage == 'debug'">
                    <CodeCircle20Filled color="#18a058" />
                </div>
                <div v-else>
                    <CodeCircle20Regular class="regular-icon" color="#18a058" />
                    <CodeCircle20Filled class="filled-icon" color="#18a058" />
                </div>
            </Icon>
        </div>
        <Icon size="28">
            <Settings20Filled color="#18a058" />
        </Icon>
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