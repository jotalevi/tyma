import { DataSource } from "typeorm";

export const databaseProviders = [
  {
    provide: "DATA_SOURCE",
    useFactory: async () => {
      const dataSource = new DataSource({
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: 5432,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASS,
        database: process.env.DATABASE_BASE,
        entities: [__dirname + "/../**/*.entity{.ts,.js}"],
        synchronize: true
      });

      return dataSource.initialize();
    }
  }
];
