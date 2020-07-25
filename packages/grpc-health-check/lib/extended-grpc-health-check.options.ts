import { GrpcOptions, Transport } from '@nestjs/microservices'
import { uniq } from 'ramda'
import { join } from 'path'

export const extendedHealthCheckGrpcOptions = (options?: GrpcOptions['options']): GrpcOptions => ({
  transport: Transport.GRPC,
  options: {
    ...options,
    package: uniq<string>([
      ...(options?.package || []),
      'grpc.health.v1',
    ]),
    protoPath: uniq<string>([
      ...(options?.protoPath || []), 
      join(__dirname, '../health.proto')
    ]),
  }
})
