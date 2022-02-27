import { ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerCustomOptions } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { SuccessRequestInterceptor } from './shared/interceptors/success-request.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      ignoreGlobalPrefix: false,
    },
  };

  app.setGlobalPrefix('api', { exclude: [''] });
  app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true }));
  app.useGlobalGuards(new JwtAuthGuard(new Reflector()));
  app.useGlobalInterceptors(new SuccessRequestInterceptor());
  const config = new DocumentBuilder()
    .setTitle('User Bank Backend API')
    .setDescription('User Bank Backend API description')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'access-token',
    )
    .addSecurityRequirements('access-token')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, customOptions);

  app.enableCors({
    origin: '*',
    credentials: true,
  });
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => console.log(`app is listening on ${PORT}`));
  // await app.listen(3000);
}
bootstrap();
