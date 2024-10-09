import { IsBoolean, IsInt, IsString, IsUrl } from "class-validator";

export class FeebackDTO {
    @IsUrl()
    @IsString()
    url: string;

    @IsBoolean()
    predicted: boolean;

    // @IsInt()
    // source: number;
}