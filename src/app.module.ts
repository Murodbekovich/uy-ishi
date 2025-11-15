import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductModule } from './product/product.module';
import { Product } from './product/entities/product.entity';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth/entities/auth.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      port: 5432,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      username: "postgres",
      models: [Product, Auth],
      autoLoadModels: true,
      synchronize: true,
      logging: false
    }),
    ProductModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }