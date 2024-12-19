import { defineConfig } from 'vitest/config'
import viteTSConfigPathsPlugin from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [viteTSConfigPathsPlugin()],
})
