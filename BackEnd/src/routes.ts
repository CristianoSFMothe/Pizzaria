import {Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController'

const router = Router();

// @ts-ignore
router.post('/users', new CreateUserController().handle);

export { router }; 