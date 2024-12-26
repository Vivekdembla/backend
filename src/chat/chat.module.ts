import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ConfigModule } from '@nestjs/config';
import { OpenAIProvider } from './openai.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true, 
    }),
],
  controllers: [ChatController],
  providers: [ChatService, OpenAIProvider]
})
export class ChatModule {}
