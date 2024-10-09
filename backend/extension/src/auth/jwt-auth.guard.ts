import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt')  {
    getRequest(context: ExecutionContext): Request {
        const request = context.switchToHttp().getRequest();
        request.header.authorization = `Bearer ${request.cookies['access_token']}`;
        return request;
    }
}