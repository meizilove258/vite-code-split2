<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
console.log(route)
console.log(router)
</script>
<template>
    <button>按钮</button>
    <div>
        about 1
    </div>
</template>
