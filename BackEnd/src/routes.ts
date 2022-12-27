import {Router } from 'express';

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController';
import {DetailsUserController} from './controllers/user/DetailsUserController';

import { isAuthenticated } from './middleware/isAuthenticated';

const router = Router();

// @ts-ignore

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

// Antes de chama o controller de detalhes chama o middleware

router.get('/info', isAuthenticated, new DetailsUserController().handle);


export { router }; 