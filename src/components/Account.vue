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
    <n-modal v-model:show="show">
        <div class="max-w-[400px] min-w-[320px] w-2/5 p-8 bg-slate-50 flex flex-col gap-8 shadow-lg rounded-lg">
            <span class="text-lg text-center">账号配置</span>
            <n-form label-placement="left" label-width="auto" require-mark-placement="right-hanging">
                <n-form-item label="username">
                    <n-input v-model:value="form.username" placeholder="yzy" />
                </n-form-item>
                <n-form-item label="password">
                    <n-input type="password" v-model:value="form.password" placeholder="password" />
                </n-form-item>
                <n-form-item label="domain">
                    <n-input v-model:value="form.domain" placeholder="localhost" />
                </n-form-item>
                <n-form-item label="resource">
                    <n-input v-model:value="form.resource" placeholder="wails" />
                </n-form-item>
                <n-form-item label="host">
                    <n-input v-model:value="form.host" placeholder="127.0.0.1" />
                </n-form-item>
                <n-form-item label="port">
                    <n-input-number v-model:value="form.port" placeholder="5222" />
                </n-form-item>
            </n-form>
            <div class="flex justify-end gap-4">
                <n-button @click="onSaveAndLoginClick" type="primary">保存并登录</n-button>
                <n-button @click="onSaveClick">仅保存</n-button>
                <n-button @click="onCancelClick">取消</n-button>
            </div>
        </div>
    </n-modal>
</template>

<style scoped></style>
