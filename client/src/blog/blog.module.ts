import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { BlogResolver } from './blog.resolver';

@Module({
  imports:[],
  providers: [BlogResolver],
})
export class BlogModule {}
