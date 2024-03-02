/** @param {import('fastify').FastifyInstance} fastify */
export default async function tasks (fastify, options) {
  const { task: entity } = fastify.platformatic.entities
  const schemaDefaults = {
    tags: ['tasks'],
    security: [{ bearerAuth: [] }]
  }
  const schemaBody = {
    type: 'object',
    properties: {
      title: { type: 'string' },
      description: { type: 'string' }
    },
    required: ['title']
  }

  fastify.addSchema({
    $id: 'Task',
    type: 'object',
    properties: {
      id: { type: 'number' },
      ...schemaBody.properties
    }
  })

  fastify.get('/', {
    schema: {
      ...schemaDefaults,
      response: {
        500: { $ref: 'HttpError' },
        200: {
          type: 'array',
          items: { $ref: 'Task#' }
        }
      }
    }
  }, async (request, reply) => {
    const user = request.user
    try {
      const tasks = await entity.find({
        where: { userId: { eq: user.id } }
      })
      return reply.send(tasks)
    } catch (error) {
      return reply.internalServerError()
    }
  })

  fastify.post('/', {
    schema: {
      ...schemaDefaults,
      body: schemaBody,
      response: {
        500: { $ref: 'HttpError' },
        201: { $ref: 'Task#' }
      }
    }
  }, async (request, reply) => {
    const user = request.user
    const { title, description } = request.body
    try {
      const task = await entity.save({
        input: { title, description, userId: user.id }
      })
      return reply.code(201).send(task)
    } catch (error) {
      return reply.internalServerError()
    }
  })

  fastify.get('/:id', {
    schema: {
      ...schemaDefaults,
      response: {
        500: { $ref: 'HttpError' },
        404: { $ref: 'HttpError' },
        200: { $ref: 'Task#' }
      }
    }
  }, async (request, reply) => {
    const user = request.user
    const taskId = request.params.id
    try {
      const [task] = await entity.find({
        where: { id: { eq: taskId }, userId: { eq: user.id } }
      })
      if (task) {
        return reply.send(task)
      } else {
        return reply.notFound()
      }
    } catch (error) {
      return reply.internalServerError()
    }
  })

  fastify.put('/:id', {
    schema: {
      ...schemaDefaults,
      body: schemaBody,
      response: {
        500: { $ref: 'HttpError' },
        200: { $ref: 'Task#' }
      }
    }
  }, async (request, reply) => {
    const user = request.user
    const taskId = request.params.id
    const { title, description } = request.body
    try {
      const task = await entity.save({
        input: { id: taskId, title, description, userId: user.id }
      })
      return reply.send(task)
    } catch (error) {
      return reply.internalServerError()
    }
  })

  fastify.delete('/:id', {
    schema: {
      ...schemaDefaults,
      response: {
        500: { $ref: 'HttpError' },
        200: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          }
        }
      }
    }
  }, async (request, reply) => {
    const user = request.user
    const taskId = request.params.id
    try {
      await entity.delete({
        where: { id: { eq: taskId }, userId: { eq: user.id } }
      })
      return reply.send({ message: 'Task deleted successfully' })
    } catch (error) {
      return reply.internalServerError()
    }
  })
}
