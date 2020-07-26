import { GrpcOptions, Transport } from '@nestjs/microservices'
import { uniq } from 'ramda'
import { join } from 'path'

export const extendedHealthCheckGrpcOptions = (options: Partial<GrpcOptions['options']> = {}): GrpcOptions => {
  const decorateValue = (value: string | string[]) => value ? (Array.isArray(value) ? value : [value]) : []
  const { package: packages, protoPath } = options
  const packageName = decorateValue(packages)
  const protoPathName = decorateValue(protoPath)

  return {
    transport: Transport.GRPC,
    options: {
      ...options,
      package: uniq<string>([
        ...packageName,
        'grpc.health.v1',
      ]),
      protoPath: uniq<string>([
        ...protoPathName,
        join(__dirname, '../health.proto')
      ]),
    }
  }
}
