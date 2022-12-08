import express, {Request, Response} from "express";
import Joi from "joi"
import {RequestValidationError} from "../errors/request-validation-error";
import {DatabaseConnectionError} from "../errors/database-connection-error";

const router = express.Router();

const signupSchema = Joi.object({
    email: Joi.string().lowercase().email({
        minDomainSegments: 2,
        tlds: {allow: ['com', 'net']}
    }),
    password: Joi.string().min(4).max(20).trim()
})

router.post(
    "/api/users/signup",
    async (req: Request, res: Response) => {

        console.log("signUp", req.body)
        const result = signupSchema.validate({email: req.body.email, password: req.body.password})

        if (result.error) {
            throw new RequestValidationError(result.error)
        }

        res.send({data: result.value});


        // new User({ email, password })
    }
);

export {router as signupRouter};
