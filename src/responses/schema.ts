import { t } from 'elysia'

export const ResponseSchema = t.Object({
	error: t.Boolean(),
	message: t.String(),
})

export const SuccessResponseSchema = t.Composite([
	ResponseSchema,
	t.Object({
		error: t.Literal(false),
	}),
])
export const ErrorResponseSchema = t.Composite([
	ResponseSchema,
	t.Object({
		error: t.Literal(true),
	}),
])
