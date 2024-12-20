export type CacheKeyType = string | number | symbol

export type CacheLike = object

export interface CacheOperations<C, T, K extends CacheKeyType> {
	get(cache: C, key: K): T | undefined
	set(cache: C, key: K, value: T): void
	remove?(cache: C, key: K): void
}

export class FlexibleMemoizer<C, T, K extends CacheKeyType = string> {
	private cache: C
	private operations: CacheOperations<C, T, K>

	constructor(cache: C, operations: CacheOperations<C, T, K>) {
		this.cache = cache
		this.operations = operations
	}

	public memoize(key: K, fn: () => T): T
	public memoize(key: K, fn: () => Promise<T>): Promise<T>
	public memoize(key: K, fn: () => T | Promise<T>): T | Promise<T> {
		const cached = this.operations.get(this.cache, key)

		if (cached !== undefined) {
			return cached
		}

		const result = fn()

		// if the callback is promise, return a promise
		if (typeof result === 'object' && 'then' in result!) {
			return new Promise((resolve) => {
				result.then((value) => {
					this.operations.set(this.cache, key, value)
					return resolve(result)
				})
			})
		}
		this.operations.set(this.cache, key, result)
		return result
	}

	public remove(key: K) {
		return this.operations.remove?.(this.cache, key)
	}

	public static createMapCacheFactory<K extends CacheKeyType, T>() {
		return new FlexibleMemoizer<Map<K, T>, T, K>(new Map(), {
			get: (cache, key) => cache.get(key),
			set: (cache, key, value) => cache.set(key, value),
			remove: (cache, key) => cache.delete(key),
		})
	}
}
