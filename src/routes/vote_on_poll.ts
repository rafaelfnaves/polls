import { z } from "zod";
import { prisma } from "../lib/prisma"
import { FastifyInstance } from "fastify";
import { randomUUID } from "crypto";

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {

    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    })

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    })
  
    const { pollId } = voteOnPollParams.parse(request.params)
    const { pollOptionId } = voteOnPollBody.parse(request.body)

    let { sessioId } = request.cookies

    if (!sessioId) {
      sessioId = randomUUID()

      reply.setCookie('SessionId', sessioId, {
        path: '/', // All routes
        maxAge: 60 * 60 * 24 * 30, // 30 days,
        signed: true,
        httpOnly: true, // only backend access cookie
      })
    }
  
    return reply.status(201).send({ sessioId })
  })
}