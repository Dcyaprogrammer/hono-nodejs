import 'dotenv/config'
import { serve, type HttpBindings } from '@hono/node-server'
import { Hono } from 'hono'

type Bindings = HttpBindings & {
  /* ... */
}

const app = new Hono<{Bindings: Bindings}>()

app.get('/', (c) => {
  return c.json({
    remoteAddress: c.env.incoming.socket.remoteAddress,
    message: 'Hello from LlamaIndex server!',
    env: process.env.NODE_ENV
  })
})

// Add a route to test if API keys are loaded
app.get('/env-test', (c) => {
  return c.json({
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
    nodeEnv: process.env.NODE_ENV
  })
})

serve(app)

