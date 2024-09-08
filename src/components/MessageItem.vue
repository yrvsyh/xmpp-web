<script setup>
const props = defineProps({
    msg: Object
})

</script>

<template>
    <div class="msg-item flex">
        <div class="avatar"></div>
        <div class="msg-info flex flex-col">
            <div class="sender"></div>
            <div class="message"></div>
        </div>
    </div>
</template>

<style scoped>
.msg-item {
    padding: 1rem;
}

.avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background-image: url('../assets/avatar.png');
    background-image: v-bind('msg.avatar');
    background-size: cover;
}

.sender {
    font-weight: bold;
}

.message {
    color: gray;
}
</style>