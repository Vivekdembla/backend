import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAIProvider {
  private readonly openai: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.openai = new OpenAI({
        organization: "org-NewJmfisFaAP9IaOrgYGqL8r",
        project: "proj_TJrn0eKhhl4FjbXiqSbGuAE8",
    });
  }

  getInstance(): OpenAI {
    return this.openai;
  }
}