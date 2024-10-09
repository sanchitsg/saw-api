import { NestFactory } from '@nestjs/core';
import { SawModule } from './saw.module';

async function bootstrap() {
  const app = await NestFactory.create(SawModule, { cors: true });
  await app.listen(8070);
}
bootstrap();
