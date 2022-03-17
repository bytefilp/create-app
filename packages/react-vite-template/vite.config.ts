import path from 'path';

import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

const baseUrl = {
    development: './',
    beta: '/',
    release: '/'
};

// https://vitejs.dev/config/
export default defineConfig(({mode}) => ({
    base: baseUrl[mode as keyof typeof baseUrl],
    build: {
        target: 'es2015'
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true
                // rewrite: path => path.replace(/^\/api/, "")
            }
        }
    },
    plugins: [
        react(),
        {
            ...legacy({
                targets: ['defaults', 'not IE 11']
            }),
            apply: 'build'
        }
    ]
}));
