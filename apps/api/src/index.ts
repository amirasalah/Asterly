import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { appRouter } from './trpc/router.js'
import { createNodeWebSocket } from '@hono/node-ws'
import { trpcServer } from '@hono/trpc-server'

const app = new Hono();
const PORT = Number(process.env.PORT || 4000)
const {upgradeWebSocket, injectWebSocket} = createNodeWebSocket({app})

app.use('/trpc/*', trpcServer({
    router: appRouter,
}))

app.get('/', (c) => c.text('Hello from Hono!'));

app.get('/ws', upgradeWebSocket((c) => {
    return {
        onOpen: (event,ws) => {
            console.log('a user connected');
            ws.send('Hello from the server');
        },
        onMessage: (event, ws) => {
            ws.send('Hello from the server');
        },
        onClose: () => {
            console.log('a user disconnected');
        },
    }
}))

const server = serve(
    { fetch: app.fetch, port: PORT },
    ({ port }) => {
      console.log(`🚀 HTTP + WS listening on http://localhost:${port}`)
    }
  )

injectWebSocket(server)