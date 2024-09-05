<script setup>
import { defineProps, defineModel, ref, watch } from "vue"
import { NModal, NForm, NFormItem, NInput, NInputNumber, NButton } from "naive-ui"
import { useAccountStore } from "../store/account"

const props = defineProps({
    id: String
})
const show = defineModel("show", {
    type: Boolean,
    default: false
})
const emit = defineEmits(['onLogin'])

const accountStore = useAccountStore()

const form = ref(accountStore.getAccount(props.id))
watch(() => props.id, (n, o) => {
    form.value = accountStore.getAccount(n)
})

const onSaveAndLoginClick = async () => {
    await onSaveClick()
    emit('onLogin', form.value.id)
}

const onSaveClick = async () => {
    let account = form.value
    if (!account.id) {
        account.id = crypto.randomUUID()
        accountStore.saveAccount(account)
    } else {
        accountStore.updateAccount(account.id, account)
    }
    show.value = false
}

const onCancelClick = () => {
    show.value = false
}

</script>

<template>
    <NModal v-model:show="show">
        <div class="max-w-[400px] min-w-[320px] w-2/5 p-8 bg-slate-50 flex flex-col gap-8 shadow-lg rounded-lg">
            <span class="text-lg text-center">账号配置</span>
            <NForm label-placement="left" label-width="auto" require-mark-placement="right-hanging">
                <NFormItem label="username">
                    <NInput v-model:value="form.username" placeholder="yzy" />
                </NFormItem>
                <NFormItem label="password">
                    <NInput type="password" v-model:value="form.password" placeholder="password" />
                </NFormItem>
                <NFormItem label="domain">
                    <NInput v-model:value="form.domain" placeholder="localhost" />
                </NFormItem>
                <NFormItem label="resource">
                    <NInput v-model:value="form.resource" placeholder="wails" />
                </NFormItem>
                <NFormItem label="host">
                    <NInput v-model:value="form.host" placeholder="127.0.0.1" />
                </NFormItem>
                <NFormItem label="port">
                    <NInput-number class="w-full" v-model:value="form.port" placeholder="5222" />
                </NFormItem>
            </NForm>
            <div class="flex justify-end gap-4">
                <NButton @click="onSaveAndLoginClick" type="primary">保存并登录</NButton>
                <NButton @click="onSaveClick">仅保存</NButton>
                <NButton @click="onCancelClick">取消</NButton>
            </div>
        </div>
    </NModal>
</template>

<style scoped></style>
