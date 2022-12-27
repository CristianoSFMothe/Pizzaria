import { Request, Response } from 'express';
import { CreateUserServices } from '../../services/user/CreateUserServices';

class CreateUserController {
    async handle(req: Response, res: Response){
        // @ts-ignore
        const { name, email, password } = req.body;

        const createUserService = new CreateUserServices();

        const user = await createUserService.execute({
            name,
            email,
            password
        });

        return res.json(user);

    }
}

export { CreateUserController };