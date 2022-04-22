import { rest } from "msw";
import env from "../src/config/env";

const gameHandlers = [
    rest.get(`${env.API_ENDPOINT}/game/random`, (req, res, ctx) => {
        return res(ctx.json(games[0]));
    }),
];

export const defaultHandlers = [...gameHandlers];

export default defaultHandlers;