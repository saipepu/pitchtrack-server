import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Pitchtrack API')
    .setDescription('Senior Project I Pitchtrack API description')
    .setVersion('1.0')
    .addTag('swagger')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter JWT token',
        in: 'header',
      },
      'bearer-token', // This is the name of the security scheme
    )
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document,
    {
      jsonDocumentUrl: 'swagger-json',
      swaggerOptions: {
        // tagsSorter: 'alpha',
      }
    }
  );

  console.log('Initiating server on port 3000 . . .')

  await app.listen(8080);

}
bootstrap();
