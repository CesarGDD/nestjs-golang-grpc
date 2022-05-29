
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as path from 'path';
import { ValidationPipe } from '@nestjs/common';


async function bootstrap() {
  const URL = 'localhost:5000';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      url: URL,
      package: 'blogpb',
      protoPath: path.resolve(__dirname, '../blogpb/blogpb.proto' ),

    }
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
  // await app.listen();
  
}
bootstrap();
