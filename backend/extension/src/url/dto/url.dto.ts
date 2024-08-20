import { IsString, IsUrl } from "class-validator";

export class UrlDto {
    @IsString()
    @IsUrl({}, {message: 'Invalid URL format provided'})
    url: string;
}