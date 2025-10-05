import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AssetModule } from './asset/asset.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validaciones globales para DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // elimina campos no definidos en DTO
      forbidNonWhitelisted: true, // lanza error si hay campos extra
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Assets API')
    .setDescription('API para gestionar Assets')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AssetModule],
  });
  SwaggerModule.setup('api', app, document);
  app.enableCors({
    origin: 'http://localhost:5173', // URL de tu frontend
  });
  const port = process.env.PORT;
  await app.listen(port);

  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Swagger disponible en http://localhost:${port}/api`);
}
bootstrap();
