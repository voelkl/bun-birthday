import { Elysia, t } from "elysia";
import { EventsDatabase } from "./db.js";
import { html } from '@elysiajs/html'
import { cors } from '@elysiajs/cors'
import { bearer } from "@elysiajs/bearer"


new Elysia()
  .use(cors(
    {
      methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
  ))
  .use(bearer()).onBeforeHandle(async ({ bearer }) => {
    if (!bearer) throw new Error("Unauthorized");
    const isAuthorized = bearer === "7GX43WAWJAKXZS8DSETPA8HN5G6VQ5LKP54SCPBN";
    if (!isAuthorized) {
      throw new Error("Unauthorized");
    }
  })
  .use(html())
  .decorate("db", new EventsDatabase())
  .get("/events", ({ db }) => db.getEvents())
  .get("/event/:id", ({ db, params }) => db.getEvent(parseInt(params.id)))
  .post(
    "/events",
    async ({ db, body }) => {
      const id = (await db.addEvent(body)).id
      return { success: true, id };
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        date: t.String(),
      }),
    },
  )
  .put(
    "/events/:id",
    ({ db, params, body }) => {
      try {
        db.updateEvent(parseInt(params.id), body)
        console.log("Event updated successfully")
        return { success: true };
      } catch (e) {
        return { success: false };
      }
    },
    {
      body: t.Object({
        title: t.String(),
        description: t.String(),
        date: t.String()
      })
    },
  )
  .delete("/events/:id", ({ db, params }) => {
    console.log(params)
    try {
      db.deleteEvent(parseInt(params.id))
      console.log("Event deleted successfully")
      return { success: true };
    } catch (e) {
      return { success: false };
    }
  })
  .listen(4000, () => console.log("listening on port: 4000"));
