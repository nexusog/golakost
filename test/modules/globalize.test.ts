import { describe, expect, it } from 'vitest'
import { Modules } from '@/index'

describe('globalize', () => {
	it('should return the same value', () => {
		const value = Modules.globalize('test', () => 1)
		expect(value).toBe(1)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((global as any).globalize).toBeDefined()
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((global as any).globalize.test).toBe(1)
	})
})
