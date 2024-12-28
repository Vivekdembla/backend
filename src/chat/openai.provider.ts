import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAIProvider {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI();
  }

  getInstance(): OpenAI {
    return this.openai;
  }
}
