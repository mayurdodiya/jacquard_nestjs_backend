import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import mongoose from 'mongoose';
import { connectToDatabase } from './config/database';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('MongoDB');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // ✅ Strip properties that don't have decorators
      // forbidNonWhitelisted: true, // ✅ Throw error if extra properties are sent
      // transform: true, // ✅ Automatically transform payloads (for class-transformer)
    }),
  );

    // Connect to MongoDB
    await connectToDatabase();

  await app.listen(process.env.PORT || 3000);
  logger.log(
    `🚀 Server running at http://localhost:${process.env.PORT || 3000}`,
  );
}
bootstrap();


// "scripts": {
//   "start:nodemon": "nodemon --watch src --ext ts --exec \"npx ts-node src/main.ts\""
// }
