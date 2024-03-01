export default async function app(fastify, options) {
  fastify.get('/hello', async (request, reply) => {
    return { hello: 'world' }
  })
}