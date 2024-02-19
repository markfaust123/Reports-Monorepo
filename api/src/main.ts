import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { HttpResponseInterceptor } from "./interceptors/http-response.interceptor";
import { HttpResponseFilter } from "./filters/http-response.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Enable transformation
      whitelist: true, // Strip properties that do not have any decorators
      forbidNonWhitelisted: true, // Throw erros if non-whitelisted values are provided
      transformOptions: {
        // Enable implicit type conversion
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpResponseFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());

  await app.listen(3000);
}
bootstrap();
