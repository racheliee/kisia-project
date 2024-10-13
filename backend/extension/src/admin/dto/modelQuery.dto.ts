import { IsIn, IsOptional, IsString } from "class-validator";

export class modelQueryDTO {
    @IsIn(['url', 'static', 'dynamic'], {
        message: 'Invalid model. Must be one of: url, static, dynamic',
    })
    @IsOptional()
    @IsString()
    model: 'url' | 'static' | 'dynamic';
}