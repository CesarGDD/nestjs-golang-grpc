import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { BlogModule } from './blog/blog.module';


@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
    typePaths:['./**/*.graphqls'],
    definitions: {
      path: join(process.cwd(), 'src/blog/graphql.ts'),
    },
    driver: ApolloDriver,
    installSubscriptionHandlers: true,
    // subscriptions: {
    //   'graphql-ws': true
    // },
  }), BlogModule],
  controllers: [],
})
export class AppModule {}
