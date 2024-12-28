import { Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { OpenAIProvider } from './openai.provider';
import { Request, Response } from 'express';
import { BASE_PROMPT, getSystemPrompt } from 'src/prompts';

import { basePrompt as reactBasePrompt } from 'src/default/react';
import { basePrompt as nodeBasePrompt } from 'src/default/node';
import { ChatCompletionMessageParam, ChatCompletionUserMessageParam } from 'openai/resources';



@Controller()
export class ChatController {
    constructor(private readonly openAIProvider: OpenAIProvider) { }
    @Get('/initial-prompts')
    async generatePrompt(@Res() res: Response, @Req() req: Request) {
        const prompt = req.query.prompt.toString();
        console.log(prompt, 'prompt')
        const openai = this.openAIProvider.getInstance();
        try {
            const response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }, { role: "system", content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra" }],
            });
            console.log(response, 'response');
            const answer = response.choices[0].message.content
            console.log(answer, 'answer');

            if (answer == "react") {
                res.json({
                    prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                    uiPrompts: [reactBasePrompt]
                })
                return;
            }

            if (answer === "node") {
                res.json({
                    prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
                    uiPrompts: [nodeBasePrompt]
                })
                return;
            }
            res.status(403).json({ message: "You cant access this" })

        } catch (error) {
            console.error(error);
            res.status(400).send(`Error fetching data`);
        }

    }

    @Get('/chat')
    async getPage(@Res() res: Response, @Req() req: Request, @Query('messages') messages: string[]) {
        const openai = this.openAIProvider.getInstance();
        const data: ChatCompletionUserMessageParam[] = messages.map((message) => {
            return { role: "user", content: message }
        })
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [...data, { role: "system", content: getSystemPrompt() }],
        });
        res.json(response.choices[0].message.content);
    }
}
