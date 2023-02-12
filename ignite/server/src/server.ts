import cors from "@fastify/cors";
import fastify from "fastify";
import { prisma } from "./lib/prisma";
import { appRoutes } from "./routes";

const app = fastify();

app.register(cors);
app.register(appRoutes);

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server runnig in localhost:3333");
  });
