import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { DatabaseModule } from "./database/database.module";
import { LoggingMiddleware } from "./logging.middleware";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "modules/auth/auth.module";
import { UserModule } from "modules/user/user.module";
import { JwtAuthGuard } from "modules/auth/jwt-auth.guard";
import { ProductModule } from "modules/product/product.module";
import { SaleModule } from "modules/sale/sale.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    SaleModule,
    ConfigModule.forRoot({
      envFilePath: ".env"
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    AppService
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
