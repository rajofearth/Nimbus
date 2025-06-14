import { joinWaitlist, getWaitlistCount } from "@/apps/server/src/controllers/waitlist";
import { emailSchema } from "@/apps/server/src/validators";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";

const waitlistRouter = new Hono();

waitlistRouter.post("/join", zValidator("json", emailSchema), joinWaitlist);
waitlistRouter.get("/count", getWaitlistCount);

export default waitlistRouter;
