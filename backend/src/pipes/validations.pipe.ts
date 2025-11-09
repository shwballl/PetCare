import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ValidationsException } from 'src/exceptions/validations.exception';


@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        if (!metadata.metatype) {
            return value;
        }
        const obj = plainToClass(metadata.metatype, value);
        const errors = validateSync(obj);

        if (errors.length > 0) {
            let messages = errors
                .map(err => {
                    return `${err.property} - ${err.constraints ? Object.values(err.constraints).join(', ') : ''}`;
                })
            throw new ValidationsException(messages);
        }
        return value;
    }
}