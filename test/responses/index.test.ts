import { Responses } from '@/index'
import { describe, expect, it, suite } from 'vitest'
import { Value } from '@sinclair/typebox/value'
import { t } from 'elysia'

suite('Responses', () => {
	it('should be defined', () => {
		expect(Responses).toBeDefined()
	})

	it('should have proper schemas', () => {
		expect(Responses.SuccessResponseSchema).toBeDefined()
		expect(Responses.ErrorResponseSchema).toBeDefined()
		expect(Responses.ResponseSchema).toBeDefined()
	})

	it('should have proper helpers', () => {
		expect(Responses.ConstructSuccessResponseSchema).toBeDefined()
		expect(Responses.ConstructErrorResponseSchema).toBeDefined()
		expect(Responses.ConstructResponseSchema).toBeDefined()
	})

	describe('ResponseSchema', () => {
		it('should pass valid schema', () => {
			expect(() =>
				Value.Assert(Responses.ResponseSchema, {
					error: true,
					message: 'test',
				}),
			).to.not.throw()
		})

		it('should throw error on invalid schema', () => {
			expect(() =>
				Value.Assert(Responses.ResponseSchema, {
					error: 1,
					message: 'test',
				}),
			).toThrow('boolean')
		})
	})

	describe('SuccessResponseSchema', () => {
		it('should pass valid schema', () => {
			expect(() =>
				Value.Assert(Responses.SuccessResponseSchema, {
					error: false,
					message: 'test',
				}),
			).to.not.throw()
		})

		it('should throw error for error=true', () => {
			expect(() =>
				Value.Assert(Responses.SuccessResponseSchema, {
					error: true,
					message: 'test',
				}),
			).toThrow('false')
		})
	})

	describe('ErrorResponseSchema', () => {
		it('should pass valid schema', () => {
			expect(() =>
				Value.Assert(Responses.ErrorResponseSchema, {
					error: true,
					message: 'test',
				}),
			).to.not.throw()
		})

		it('should throw error for error=false', () => {
			expect(() =>
				Value.Assert(Responses.ErrorResponseSchema, {
					error: false,
					message: 'test',
				}),
			).toThrow('true')
		})
	})

	describe('ConstructResponseSchema', () => {
		const dataSchema = t.Object({
			name: t.String(),
		})

		const constructedSchema = Responses.ConstructResponseSchema(dataSchema)

		it('should pass valid schema', () => {
			expect(() =>
				Value.Assert(constructedSchema, {
					error: false,
					message: 'test',
					data: {
						name: 'test',
					},
				}),
			).to.not.throw()
		})

		it('should throw for not passing name', () => {
			expect(() =>
				Value.Assert(constructedSchema, {
					error: true,
					message: 'test',
					data: {},
				}),
			).toThrow('required')
		})

		it('should throw for not passing data', () => {
			expect(() =>
				Value.Assert(constructedSchema, {
					error: false,
					message: 'test',
				}),
			).toThrow('required')
		})
	})

	describe('ConstructSuccessResponseSchema', () => {
		const dataSchema = t.Object({
			name: t.String(),
		})

		const constructedSchema =
			Responses.ConstructSuccessResponseSchema(dataSchema)

		it('should pass valid schema', () => {
			expect(() =>
				Value.Assert(constructedSchema, {
					error: false,
					message: 'test',
					data: {
						name: 'test',
					},
				}),
			).to.not.throw()
		})

		it('should throw for error=true', () => {
			expect(() =>
				Value.Assert(constructedSchema, {
					error: true,
					message: 'test',
					data: {
						name: 'test',
					},
				}),
			).toThrow('false')
		})

		it('should throw for not passing name', () => {
			expect(() =>
				Value.Assert(constructedSchema, {
					error: false,
					message: 'test',
					data: {},
				}),
			).toThrow('required')
		})

		it('should throw for not passing data', () => {
			expect(() =>
				Value.Assert(constructedSchema, {
					error: false,
					message: 'test',
				}),
			).toThrow('required')
		})
	})

	describe('ConstructErrorResponseSchema', () => {
		const dataSchema = t.Object({
			name: t.String(),
		})

		const constructedSchema =
			Responses.ConstructErrorResponseSchema(dataSchema)

		it('should pass valid schema', () => {
			expect(() =>
				Value.Assert(constructedSchema, {
					error: true,
					message: 'test',
					data: {
						name: 'test',
					},
				}),
			).to.not.throw()
		})

		it('should throw for error=false', () => {
			expect(() =>
				Value.Assert(constructedSchema, {
					error: false,
					message: 'test',
					data: {
						name: 'test',
					},
				}),
			).toThrow('true')
		})

		it('should throw for not passing name', () => {
			expect(() =>
				Value.Assert(constructedSchema, {
					error: true,
					message: 'test',
					data: {},
				}),
			).toThrow('required')
		})

		it('should throw for not passing data', () => {
			expect(() =>
				Value.Assert(constructedSchema, {
					error: true,
					message: 'test',
				}),
			).toThrow('required')
		})
	})
})
