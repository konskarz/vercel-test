'use strict'

/** @param {import('fastify').FastifyInstance} app */
export default async function task(app, options) {
  const { task: entity } = app.platformatic.entities
  const schemaDefaults = { tags: ['tasks'], security: [{ bearerAuth: [] }] }
  const schemaInput = {
    type: 'object',
    properties: { title: { type: 'string' }, description: { type: 'string', nullable: true } },
    required: ['title']
  }

  app.addSchema({
    $id: 'Task',
    type: 'object',
    properties: { id: { type: 'integer' }, ...schemaInput.properties }
  })

  app.get(
    '/',
    {
      schema: { ...schemaDefaults, response: { 200: { type: 'array', items: { $ref: 'Task#' } } } }
    },
    async (request, reply) => {
      const res = await entity.find({ where: { userId: { eq: request.user.id } } })
      return res
    }
  )

  app.post(
    '/',
    {
      schema: {
        ...schemaDefaults,
        body: schemaInput,
        response: { 200: { $ref: 'Task#' } }
      }
    },
    async (request, reply) => {
      const res = await entity.save({ input: { ...request.body, userId: request.user.id } })
      return res
    }
  )

  app.get(
    '/:id',
    { schema: { ...schemaDefaults, response: { 200: { $ref: 'Task#' } } } },
    async (request, reply) => {
      const res = await entity.find({ where: { id: { eq: request.params.id } } })
      return res.length === 0 ? reply.callNotFound() : res[0]
    }
  )

  app.put(
    '/:id',
    { schema: { ...schemaDefaults, body: schemaInput, response: { 200: { $ref: 'Task#' } } } },
    async (request, reply) => {
      const res = await entity.save({ input: { id: request.params.id, ...request.body } })
      return res
    }
  )

  app.delete(
    '/:id',
    { schema: { ...schemaDefaults, response: { 200: { $ref: 'Task#' } } } },
    async (request, reply) => {
      const res = await entity.delete({ where: { id: { eq: request.params.id } } })
      return res.length === 0 ? reply.callNotFound() : res[0]
    }
  )
}
