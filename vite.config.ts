import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env files regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [vue()],
    // All env variables will be available via `import.meta.env`
    // Example: to access `VITE_SOME_KEY`, use `import.meta.env.VITE_SOME_KEY`
    define: {
      // Stringify the env variables so that they can be used in the application
      'process.env': JSON.stringify(env)
    }
  }
})