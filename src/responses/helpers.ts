import { t, TSchema } from 'elysia'
import {
	ErrorResponseSchema,
	ResponseSchema,
	SuccessResponseSchema,
} from './schema'

type TObjectOptions = Partial<Parameters<typeof t.Object>[1]>

export function ConstructResponseSchema<T extends TSchema>(
	data: T,
	options: TObjectOptions = {},
) {
	return t.Object(
		{
			...ResponseSchema.properties,
			data,
		},
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
	return t.Object(
		{
			...SuccessResponseSchema.properties,
			data,
		},
		{
			readOnly: true,
			...options,
		},
	)
}

export function ConstructErrorResponseSchema<T extends TSchema>(
	data: T,
	options: TObjectOptions = {},
) {
	return t.Object(
		{
			...ErrorResponseSchema.properties,
			data,
		},
		{
			readOnly: true,
			...options,
		},
	)
}
