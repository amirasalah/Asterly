import { Hono } from 'hono';
import { serve } from '@hono/node-server';

const app = new Hono();

app.get('/', (c) => c.text('Hello from Hono!'));

serve({
    fetch: app.fetch,
    port: 4000,
}, (info) => {
    console.log(`Server is running on ${info.address}:${info.port}`);
});
