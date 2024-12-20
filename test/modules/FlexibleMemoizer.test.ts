import { Modules } from '@/index'
import { describe, expect, it } from 'vitest'

const key = 'test'

describe('Modules.FlexibleMemoizer', () => {
	it('should memoize Map', () => {
		const cache = new Map<string, number>()

		const memoized = new Modules.FlexibleMemoizer(cache, {
			get: (cache, key) => cache.get(key),
			set: (cache, key, value) => cache.set(key, value),
			remove: (cache, key) => cache.delete(key),
		})

		const initialHit = memoized.memoize(key, () => 1)

		expect(initialHit).toBe(1)

		const secondHit = memoized.memoize(key, () => 2)

		// response already memoized
		expect(secondHit).toBe(1)

		memoized.remove(key)

		const thirdHit = memoized.memoize(key, () => 3)

		expect(thirdHit).toBe(3)
	})

	it('should memoize object', () => {
		const cache: Record<string, number> = {}

		const memoized = new Modules.FlexibleMemoizer(cache, {
			get: (cache, key) => cache[key],
			set: (cache, key, value) => (cache[key] = value),
			remove: (cache, key) => delete cache[key],
		})

		const initialHit = memoized.memoize(key, () => 1)

		expect(initialHit).toBe(1)

		const secondHit = memoized.memoize(key, () => 2)

		// response already memoized
		expect(secondHit).toBe(1)

		memoized.remove(key)

		const thirdHit = memoized.memoize(key, () => 3)

		expect(thirdHit).toBe(3)
	})

	it('should memoize promise', async () => {
		const cache = new Map<string, number>()

		const memoized = new Modules.FlexibleMemoizer(cache, {
			get: (cache, key) => cache.get(key),
			set: (cache, key, value) => cache.set(key, value),
			remove: (cache, key) => cache.delete(key),
		})

		const initialHit = memoized.memoize(key, async () => 1)

		await expect(initialHit).resolves.toBe(1)

		const secondHit = memoized.memoize(key, async () => 2)

		// response already memoized
		// we don't expect promise because the logic will hit cache before it hits callback
		expect(secondHit).toBe(1)

		memoized.remove(key)

		const thirdHit = memoized.memoize(key, async () => 3)

		// we expect the promise because we delete key
		await expect(thirdHit).resolves.toBe(3)
	})

	describe('createMapCacheFactory', async () => {
		it('should be defined', () => {
			expect(Modules.FlexibleMemoizer.createMapCacheFactory).toBeDefined()
		})

		it('should return a FlexibleMemoizer', () => {
			const memoizer = Modules.FlexibleMemoizer.createMapCacheFactory<
				string,
				number
			>()

			expect(memoizer).toBeInstanceOf(Modules.FlexibleMemoizer)
		})

		it('should work as expected', () => {
			const memoizer = Modules.FlexibleMemoizer.createMapCacheFactory<
				string,
				number
			>()

			const initialHit = memoizer.memoize(key, () => 1)

			expect(initialHit).toBe(1)

			const secondHit = memoizer.memoize(key, () => 2)

			// response already memoized
			expect(secondHit).toBe(1)

			memoizer.remove(key)

			const thirdHit = memoizer.memoize(key, () => 3)

			expect(thirdHit).toBe(3)
		})
	})
})
