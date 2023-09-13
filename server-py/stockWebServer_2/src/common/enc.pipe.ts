import {
    Injectable,
    ForbiddenException,
    PipeTransform,
    ArgumentMetadata,
} from '@nestjs/common';
import { AuthService } from 'auth/auth.service';

@Injectable()
export class EncPipe implements PipeTransform {
    constructor(private authService: AuthService) {}
    async transform(value: any, metadata: ArgumentMetadata) {
        try {
            const res = await this.authService.decryptJSON(value.enc || '');
            return res;
        } catch (e) {
            console.log(e);
            throw new ForbiddenException();
        }
    }
}
