<script setup>
import { useRoute, useRouter } from 'vue-router'
import { sum } from '@/serve'
import { add } from '@/utils'

sum()
add()
const route = useRoute()
const router = useRouter()
console.log(route)
console.log(router)
function btnClick() {
    import('../foo').then(({ default: foo }) => foo)
}
</script>

<template>
    <button @click="btnClick">按钮</button>
    <div>
        help 2
    </div>
</template>