import { ClientOptions, Transport } from "@nestjs/microservices";
import { join } from "path";

export const grpcClient: ClientOptions = {
    transport: Transport.GRPC,
    options: {
      url: 'localhost:5000',
      package: 'blogpb',
      protoPath: join(__dirname, '../blogpb/blogpb.proto')
    }
}