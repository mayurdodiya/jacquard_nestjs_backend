// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { AdminModule } from './modules/admin/admin.module';
// import { MongooseModule } from '@nestjs/mongoose';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import * as mongoose from 'mongoose';
// import { connection } from 'mongoose';

// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true }),

//     // MongoDB connection using env
//     MongooseModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: async (configService: ConfigService) => {
//         const uri = configService.get<string>('MONGO_URI');
//         console.log('Connecting to MongoDB URI:', uri);
//         return {
//           uri,
//           connectionFactory: (connection) => {
//             connection.on('connected', () => {
//               console.log('✅ MongoDB Connected via Factory');
//             });
//             connection.on('error', (err: any) => {
//               console.log('❌ MongoDB Error via Factory:', err);
//             });
//             return connection;
//           },
//         };
//       },
//     }),
//     AdminModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}


import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { User, UserSchema } from './schemas/user.schema';
import { Company, CompanySchema } from './schemas/company.schema';
import { CompanyModule } from './modules/company/company.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
    }),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Company.name, schema: CompanySchema },
    ]),

    AdminModule,
    CompanyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  // constructor() {
  //   console.log('App Module Loaded');
  // }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude( // ✅ Exclude public routes
        '/admin/auth/login',
        '/company/auth/login',
      )
      .forRoutes('*'); // ✅ Apply globally, or you can target specific routes
  }
}
