import { Router } from "express";
// -- User --
import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailsUserController } from './controllers/user/DetailsUserController';
// -- Middleware --
import { isAuthenticated } from './middleware/isAuthenticated';
// -- Category --
import {CreateCategoryController} from './controllers/category/CreateCategoryController';
import {ListCategoryController} from './controllers/category/ListCategoryController';
// -- Products --
import {CreateProductController} from './controllers/product/CreateProductController';

const router = Router();

// @ts-ignore

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

// Antes de chama o controller de detalhes chama o middleware

router.get('/info', isAuthenticated, new DetailsUserController().handle);

//-- ROTAS CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

//-- ROTAS PRODUCTS --
router.post('/product', isAuthenticated, new CreateProductController().handle);

export { router };
