import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsDuration(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isDuration',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Regex to validate hh:mm:ss format
          const durationRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
          return typeof value === 'string' && durationRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be in the format hh:mm:ss`;
        }
      }
    });
  };
}
