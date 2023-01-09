<script setup>
import { useRoute } from 'vue-router'
import { sum } from '@/serve'
import { add } from '@/utils'

sum()
add()
const route = useRoute()
console.log(route)
const router = useRouter()
console.log(router)
</script>
<template>
    <button>按钮</button>
    <div>
        about 1
    </div>
</template>
