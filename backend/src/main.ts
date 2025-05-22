import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as bodyParser from "body-parser";
import * as compression from "compression";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["log", "error", "warn"]
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableCors();

  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

  app.use(compression());

  await app.listen(process.env.NODE_PORT);
}
bootstrap();
