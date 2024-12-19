import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/index.ts'],
	splitting: false,
	sourcemap: false,
	clean: true,
	keepNames: true,
	dts: true,
	format: ['cjs', 'esm'],
	target: 'es2022',
})
