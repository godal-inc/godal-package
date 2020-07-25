export enum ServingStatus {
  UNKNOWN,
  SERVING,
  NOT_SERVING,
}

export interface HealthCheckRequest {
  service: string
}

export interface HealthCheckResponse {
  status: ServingStatus
}

export interface IHealthService {
  check(args: HealthCheckRequest): HealthCheckResponse
}
