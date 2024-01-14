import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(morgan('combined'));
  app.setGlobalPrefix('api/v1')
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('PROPERTY MART API')
    .setDescription('The Property Mart API description')
    .setVersion('0.0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port, () => console.log(`SERVER RUNNING ON PORT : ${port}`));
}
bootstrap();
