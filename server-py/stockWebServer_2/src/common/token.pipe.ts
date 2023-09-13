import {
    Injectable,
    ForbiddenException,
    PipeTransform,
    ArgumentMetadata,
} from '@nestjs/common';
import { AuthService } from 'auth/auth.service';

@Injectable()
export class TokenPipe implements PipeTransform {
    constructor(private authService: AuthService) {}
    async transform(value: any, metadata: ArgumentMetadata) {
        try {
            return value.replace('Bearer ', '');
        } catch (e) {
            console.log(e);
            throw new ForbiddenException();
        }
    }
}
