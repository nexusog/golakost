import { t, TSchema } from 'elysia'
import { ResponseSchema } from './schema'

type TObjectOptions = Partial<Parameters<typeof t.Object>[1]>

export function ConstructResponseSchema<T extends TSchema, E extends boolean>(
	data: T,
	error?: E,
	options: TObjectOptions = {},
) {
	return t.Composite(
		[
			ResponseSchema,
			typeof error === 'boolean'
				? t.Object({
						error: t.Literal(error),
					})
				: t.Object({}),
			t.Object({
				data,
			}),
		],
		{
			readOnly: true,
			...options,
		},
	)
}

export function ConstructSuccessResponseSchema<T extends TSchema>(
	data: T,
	options: TObjectOptions = {},
) {
	return ConstructResponseSchema(data, false, options)
}

export function ConstructErrorResponseSchema<T extends TSchema>(
	data: T,
	options: TObjectOptions = {},
) {
	return ConstructResponseSchema(data, true, options)
}
