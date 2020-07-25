import { Controller } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import { HealthService } from './health.service'

@Controller()
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
  ) {}

  @GrpcMethod('Health')
  check() {
    return this.healthService.check()
  }
}
