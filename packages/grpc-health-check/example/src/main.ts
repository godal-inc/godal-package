import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices'
import { extendedHealthCheckGrpcOptions } from '@godal-inc/grpc-health-check-nestjs'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    extendedHealthCheckGrpcOptions(),
  );
  await app.listen(() => console.log('Microservice is started'));
}
bootstrap();
