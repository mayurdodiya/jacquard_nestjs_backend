import mongoose from 'mongoose';
import { Logger } from '@nestjs/common';

const logger = new Logger('MongoDB');

export const connectToDatabase = async () => {
  const mongoUri =
    process.env.MONGO_URI || 'mongodb://localhost:27017/jacquard';

  try {
    await mongoose.connect(mongoUri);
    logger.log('✅ MongoDB Connected');
  } catch (error) {
    logger.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit if connection fails
  }

  mongoose.connection.on('disconnected', () => {
    logger.error('❌ MongoDB Disconnected');
  });
};
