import { t } from 'elysia'

export const ResponseSchema = t.Object({
	error: t.Boolean(),
	message: t.String(),
})

export const SuccessResponseSchema = t.Object({
	...ResponseSchema.properties,
	error: t.Literal(false),
})

export const ErrorResponseSchema = t.Object({
	...ResponseSchema.properties,
	error: t.Literal(true),
})
