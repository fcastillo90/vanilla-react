import { defineConfig } from 'vite'
const path = require('path')

export default defineConfig({
  esbuild: {
    jsxFactory: 'React.createElement',
  },
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src')
    },
  },
})