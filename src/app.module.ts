import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {CatsModule} from "./cats/cats.module";
import {LoggerMiddleware} from "./cats/LoggerMiddleware";
import {CatsController} from "./cats/cats.controller";

@Module({
  imports: [CatsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
        .apply(LoggerMiddleware)
        .forRoutes({path: 'cats/findAllAsync' , method: RequestMethod.GET});
  }

}
