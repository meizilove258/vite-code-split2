import { createRouter, createWebHashHistory  } from 'vue-router'

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            redirect: '/about',
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../pages/about.vue') 
         },
         {
             path: '/help',
             name: 'help',
             component: () => import('../pages/help.vue') 
         }
    ]
})

export default router
