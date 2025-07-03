import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();

export const appRouter = t.router({
    hello: t.procedure.input(z.string().nullish()).query(({ input }) => {
        return {
            greeting: `Hello ${input ?? 'world'}`,
        }
    }),
    echo: t.procedure.input(z.string().nullish()).mutation(({ input }) => {
        return {
            echo: input,
        }
    }),
});

export type AppRouter = typeof appRouter;