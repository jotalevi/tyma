import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("DATABASE_HOST"),
        port: 5432,
        username: configService.get<string>("DATABASE_USER"),
        password: configService.get<string>("DATABASE_PASS"),
        database: configService.get<string>("DATABASE_BASE"),
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: true
      }),
      inject: [ConfigService]
    })
  ],
  exports: [TypeOrmModule] // Ensure TypeOrmModule is exported
})
export class DatabaseModule {}
