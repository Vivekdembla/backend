
import { IsString, IsIn } from 'class-validator';
export class MessagesDTO {
    @IsString()
    message: string;

    @IsString()
    @IsIn(['user', 'system', 'assistant'])
    role: 'user' | 'system' | 'assistant';

}