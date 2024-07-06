import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ReactCompilerConfig = {
  compilationMode: "annotation",
}

export default defineConfig(async ({ mode }) => {
  const plugins = [react({
    babel: {
      plugins: [
        ["babel-plugin-react-compiler", ReactCompilerConfig],
      ],
    },
  })]

  return {
    plugins,
  }
})