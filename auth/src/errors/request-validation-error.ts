import {ValidationError} from "joi";
import {CustomError} from "./custom-error";

export class RequestValidationError extends CustomError{
    statusCode = 400
    constructor(public error: ValidationError) {
        super("Invalid validation params");
        Object.setPrototypeOf(this, RequestValidationError.prototype)
    }

    serializeErrors() {
        return [{message: this.error.details}]
    }
}