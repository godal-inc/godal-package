import { Injectable } from '@nestjs/common'
import { IHealthService, HealthCheckResponse, ServingStatus } from './health.interface'

@Injectable()
export class HealthService implements IHealthService {
  check(): HealthCheckResponse {
    return {
      status: ServingStatus.SERVING,
    }
  }
}
