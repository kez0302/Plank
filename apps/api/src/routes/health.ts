import type { FastifyInstance } from 'fastify';
import { sql } from '../db/client.js';

export async function healthRoutes(app: FastifyInstance): Promise<void> {
  app.get('/health', async (_req, reply) => {
    try {
      await sql`SELECT 1`;
      return reply.send({ status: 'ok', db: true });
    } catch (err) {
      app.log.error(err);
      return reply.status(503).send({ status: 'error', db: false });
    }
  });
}