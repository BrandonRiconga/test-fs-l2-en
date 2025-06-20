import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { Product } from './products/entities/product.entity';
import { Category } from './categories/entities/category.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'brik_db',
      autoLoadEntities: true,
      synchronize: true,
      entities: [
        User,
        Product,
        Category
      ]
    }),
    UsersModule,
    AuthModule,
    ProductsModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
