import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'

export default defineConfig({
    plugins: [
        vue({
            reactivityTransform: true,
        }),
        // splitVendorChunkPlugin(),
        chunkSplitPlugin({
            strategy: 'unbundle',
            customSplitting: {
                vue: ['vue'],
                'vue-router': ['vue-router']
            }
        }),
    ],
    // build: {
    //     rollupOptions: {
    //         output: {
    //             manualChunks(id) {
    //                 console.log(id)
    //             }
    //         }
    //     }
    // },
    preview: {
        port: 4000
    }
})
