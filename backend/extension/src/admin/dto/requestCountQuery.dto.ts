import { IsIn } from 'class-validator';

export class RequestCountQueryDTO {
  @IsIn(['hour', 'day', 'week', 'month'], {
    message: 'Invalid query. Must be one of: day, week, month',
  })
  interval: 'hour' | 'day' | 'week' | 'month';
}
