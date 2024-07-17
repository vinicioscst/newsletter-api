import "dotenv/config";
import express, { Router } from "express";
import cors from "cors";
import { ArticleRouter } from "./router/article.router.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";

class ServerBootstrap {
  public app: express.Application = express();
  private port: number = Number(process.env.PORT);

  constructor() {
    this.app.use(
      cors({
        origin: ["http://localhost:8000", "https://newsletter-vue.vercel.app"],
      })
    );
    this.app.use("/api", this.routers());
    this.app.use(errorHandler);
    this.listen();
  }

  public listen() {
    this.app.listen(this.port || 3000, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }

  routers(): Router[] {
    return [new ArticleRouter().router];
  }
}

new ServerBootstrap();
