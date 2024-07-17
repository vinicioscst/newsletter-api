import "dotenv/config";
import express, { Router } from "express";
import cors from "cors";
import { ArticleRouter } from "./router/article.router.js";
import { errorHandler } from "./helpers/errors/errorHandler.js";
import { prisma } from "./database/prisma/prismaClient.js";
import { UserRouter } from "./router/user.router.js";

class ServerBootstrap {
  public app: express.Application = express();
  private port: number = Number(process.env.PORT);

  constructor() {
    this.middlewares();
    this.routes();

    this.app.use(errorHandler);

    this.listen();
  }

  private middlewares() {
    this.app.use(
      cors({
        origin: ["http://localhost:8000", "https://newsletter-vue.vercel.app"],
      })
    );

    this.app.use(express.json());
  }

  private routes() {
    this.app.use("/api", this.routers());
  }

  private routers(): Router[] {
    return [new ArticleRouter().router, new UserRouter().router];
  }

  public listen() {
    this.app.listen(this.port || 3000, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

new ServerBootstrap();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Database disconnected");
  process.exit();
});
