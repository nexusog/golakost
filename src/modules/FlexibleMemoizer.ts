export type CacheKeyType = string | number | symbol

export type CacheLike = object

type MaybePromise<T> = T | Promise<T>

export interface CacheOperations<C, T, K extends CacheKeyType> {
	get(cache: C, key: K): MaybePromise<T | undefined>
	set(cache: C, key: K, value: T): MaybePromise<unknown>
	remove?(cache: C, key: K): MaybePromise<unknown>
}

export class FlexibleMemoizer<C, T, K extends CacheKeyType = string> {
	private cache: C
	private operations: CacheOperations<C, T, K>

	constructor(cache: C, operations: CacheOperations<C, T, K>) {
		this.cache = cache
		this.operations = operations
	}

	public async memoize(key: K, fn: () => T | Promise<T>): Promise<T> {
		const cached = await this.operations.get(this.cache, key)

		if (cached !== undefined) {
			return Promise.resolve(cached)
		}

		const result = await fn()

		await this.operations.set(this.cache, key, result)

		return Promise.resolve(result)
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
