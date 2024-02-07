import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { createPoll } from '../routes/create_poll'
import { getPoll } from '../routes/get_poll'
import { voteOnPoll } from '../routes/vote_on_poll'

const app = fastify()

app.register(cookie, {
  secret: 'polls-app-nlw',
  hook: 'onRequest',
})

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)

app.listen({ port: 3333 }).then(() => {
  console.log('Running Server!')
})