import { Elysia, t } from "elysia";
import { EventsDatabase } from "./db.js";
import { html } from '@elysiajs/html'
import { cors } from '@elysiajs/cors'

new Elysia()
  .use(cors())
  .use(html())
  .decorate("db", new EventsDatabase())
  .get("/", async () => Bun.file('./dist/index.html'))
  .get("/events", ({ db }) => db.getEvents())
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
