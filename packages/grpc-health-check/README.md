# GRPC Health Check for NestJS

## Installation

```bash
yarn add @godal-inc/grpc-health-check
```

## Usage

### Initial grpc health check
```ts
// main.ts
async function bootstrap() {
  app = moduleFixture.
    createNestMicroservice<MicroserviceOptions>(
      extendedHealthCheckGrpcOptions({
        options: {
          url: '0.0.0.0:5000',
          package: ['stores'],
          protoPath: ['stores.proto'],
        }
      })
    );

  await app.listenAsync()
}
```

### Import health module
```ts
@Module({
  imports: [
    HealthModule // Can custom module
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

## Custom Health Check
```ts
@Controller()
export class HealthController {
  constructor() {}

  @GrpcMethod('Health') // decolate with this decolator
  check(args: HealthCheckRequest): HealthCheckResponse { // custom this fuction
    return { 
      status: ServingStatus.SERVING
    }
  }
}
```
