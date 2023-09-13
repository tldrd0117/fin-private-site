import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'auth/auth.service';
import {
    TokenExpiredError,
    NotBeforeError,
    JsonWebTokenError,
} from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return this.validateToken(request);
    }

    async validateToken(request: any) {
        console.log(request.headers.authorization);
        try {
            request.headers.authorization =
                request.headers.authorization.replace('Bearer ', '');
            await this.authService.verifyToken(request.headers.authorization);
            return true;
        } catch (e) {
            if (e instanceof TokenExpiredError) {
                throw new UnauthorizedException('validate.token.expired');
            } else if (e instanceof NotBeforeError) {
                throw new UnauthorizedException('validate.token.notBefore');
            } else if (e instanceof JsonWebTokenError) {
                throw new UnauthorizedException('validate.token.invalid');
            } else if (request.header.authorization === undefined) {
                throw new UnauthorizedException('validate.token.notExist');
            } else {
                throw e;
            }
        }
    }
}
