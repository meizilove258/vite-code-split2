import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import { chunkSplitPlugin } from 'vite-plugin-chunk-split'
import path from 'node:path'

export default defineConfig({
    plugins: [
        vue({
            reactivityTransform: true,
        }),
        // splitVendorChunkPlugin(),
        chunkSplitPlugin({
            strategy: 'default',
            customSplitting: {
                // vue: ['vue'],
                // 'vue-router': ['vue-router']
                'utils-serve': [/\/src\/serve/, /\/src\/utils/]
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
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src')
        }
    }
})
