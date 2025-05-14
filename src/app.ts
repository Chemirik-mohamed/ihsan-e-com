import { Hono } from 'hono'

export const app = new Hono()

import { appRouter } from './routes'

app.route('/api', appRouter)