<script setup>
import { NModal, NButton, NRadioGroup, NRadio } from "naive-ui"
import Account from "./Account.vue"
import { ref } from "vue"
import { AddCircle32Filled } from "@vicons/fluent"
import { Icon } from "@vicons/utils"
import { useAccountStore } from "../store/account"

const emit = defineEmits(["onLogin"])

const show = defineModel("show", {
    type: Boolean,
    default: false,
})

const accountStore = useAccountStore()

const editingAccountId = ref("")
const showAccountEditor = ref(false)
const selectedAccountId = ref("")

const onItemSelected = (id) => {
    selectedAccountId.value = id
    editingAccountId.value = id
}

const onAddAccountClick = () => {
    editingAccountId.value = ""
    showAccountEditor.value = true
}

const onEditAccountClick = () => {
    editingAccountId.value = selectedAccountId.value
    showAccountEditor.value = true
}

const onLoginClicked = () => {
    emit("onLogin", selectedAccountId.value)
    show.value = false
}

const onSaveAndLogin = (id) => {
    selectedAccountId.value = id
    onLoginClicked()
}
</script>

<template>
    <NModal
        class="w-72 max-h-96 rounded-lg"
        id="login-select"
        v-model:show="show"
    >
        <div class="bg-slate-100 flex flex-col p-4 gap-4">
            <div class="text-lg text-center flex justify-between px-4">
                <span>选择登录账号</span>
                <div @click="onAddAccountClick">
                    <Icon size="24">
                        <AddCircle32Filled color="#18a058" />
                    </Icon>
                </div>
            </div>

            <div class="max-h-96 w-full overflow-auto">
                <NRadioGroup
                    class="w-full flex flex-col"
                    v-model:value="selectedAccountId"
                    name="group"
                >
                    <div
                        class="flex flex-col gap-2"
                        v-for="account in accountStore.accounts"
                    >
                        <div
                            class="w-full h-12 flex items-center gap-8 p-4 rounded hover:bg-slate-200 cursor-pointer"
                            @click="onItemSelected(account.id)"
                        >
                            <div class="shrink-0">
                                <NRadio
                                    size="large"
                                    :key="account.id"
                                    :value="account.id"
                                />
                            </div>
                            <div class="w-full text-left align-middle">
                                <div>
                                    {{
                                        `${account.username}@${account.domain}/${account.resource}`
                                    }}
                                </div>
                                <div class="text-right text-gray-300">
                                    {{ `${account.host}:${account.port}` }}
                                </div>
                            </div>
                        </div>
                    </div>
                </NRadioGroup>
            </div>

            <div class="flex gap-2 justify-end">
                <NButton type="primary" size="small" @click="onLoginClicked"
                    >登录</NButton
                >
                <NButton size="small" @click="onEditAccountClick">编辑</NButton>
            </div>
        </div>
    </NModal>
    <Account
        :id="editingAccountId"
        v-model:show="showAccountEditor"
        @on-login="onSaveAndLogin"
    />
</template>

<style scoped></style>
