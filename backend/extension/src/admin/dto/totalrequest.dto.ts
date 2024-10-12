import { IsIn } from "class-validator";

export class TotalRequestsQueryDTO {
    @IsIn(['day', 'week', 'month'], {
        message: 'Invalid query. Must be one of: day, week, month'
    })
    interval: 'day' | 'week' | 'month';

}