import { PrismaClient } from "@prisma/client";
import cors from "@fastify/cors";
import fastify from "fastify";

const app = fastify();
const prisma = new PrismaClient();

app.register(cors);

app.get("/", () => {
  const habits = prisma.habit.findMany({
    where: {
      title: {
        startsWith: "Beber",
      },
    },
  });

  return habits;
});

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log("HTTP Server runnig in localhost:3333");
  });
