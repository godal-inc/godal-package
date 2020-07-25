import { Test, TestingModule } from '@nestjs/testing';
import { Module, INestMicroservice } from '@nestjs/common';
import { MicroserviceOptions, ClientsModule, Transport, ClientGrpc } from '@nestjs/microservices';
import { join } from 'path'
import { HealthModule, extendedHealthCheckGrpcOptions } from '../lib'
import { HealthService } from './health.service'
import { ServingStatus } from '../dist/health.interface';

describe('AppController (e2e)', () => {
  let app: INestMicroservice;
  let client: ClientGrpc
  let service: HealthService

  beforeAll(async () => {
    @Module({
      imports: [HealthModule],
    })
    class RootModule {}
    
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        RootModule,
        ClientsModule.register([
          {
            name: 'HEALTH_PACKAGE',
            transport: Transport.GRPC,
            options: {
              package: 'grpc.health.v1',
              protoPath: join(__dirname, '../health.proto'),
            }
          }
        ])
      ],
    }).compile();

    app = moduleFixture.createNestMicroservice<MicroserviceOptions>(extendedHealthCheckGrpcOptions());

    client = app.get('HEALTH_PACKAGE') 
    service = client.getService<HealthService>('Health')

    await app.init();
    await app.listenAsync()
  });

  it('should send health package', async () => {
    const response = await service.check({}).toPromise()
    console.log(response)
    expect(response.status).toBe(ServingStatus.SERVING)
  })
});
