import { ClassConstructor, plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { logger } from '../utils/logger';

export default class ValidatorMiddleware {
  public validate(type: ClassConstructor<any>) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { errors, input } = await this.RequestValidator(type, req.body);
        if (errors) return res.status(400).json({ message: errors });

        next();
      } catch (err) {
        logger.error(err);
        if (err instanceof Error)
          return res.status(500).json({ message: err.message });
      }
    };
  }

  private async validationError(
    input: any
  ): Promise<ValidationError[] | false> {
    const errors = await validate(input, { validationError: { target: true } });

    if (errors.length) {
      return errors;
    }

    return false;
  }

  private async RequestValidator<T>(type: ClassConstructor<T>, body: any) {
    const input = plainToClass(type, body);

    const errors = await this.validationError(input);
    if (errors) {
      const errorMessage = errors
        .map((error: ValidationError) =>
          (Object as any).values(error.constraints)
        )
        .join(', ');

      return { errors: errorMessage, input };
    }

    return { errors: false, input };
  }
}
