import { Router } from 'express';
import multer from 'multer';
// -- USER --
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthUserController } from './controllers/user/AuthUserController'
import { DetailuserController } from './controllers/user/DetailUserController'
// -- CATEGORY --
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
// -- PRODUCT --
import { CreateProductController } from './controllers/product/CreateProductController'
import { ListByCategoryProduct } from './controllers/product/ListByCategoryProduct';
// -- ORDER --
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoverOrderController } from './controllers/order/RemoverOrderController';
import { ListOrderController } from './controllers/order/ListOrderController';
import { AddItemController } from './controllers/order/AddItemController';
// -- MIDDLEWARE --

import { isAuthenticated } from './middlewares/isAuthenticated'
import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//-- ROTAS USER --
router.post('/users', new CreateUserController().handle)

router.post('/session', new AuthUserController().handle);

router.get('/me', isAuthenticated,  new DetailuserController().handle );

//-- ROTAS CATEGORY --
router.post('/category', isAuthenticated, new CreateCategoryController().handle );

router.get('/category', isAuthenticated, new ListCategoryController().handle );

//-- ROTAS PRODUCT --
router.post('/product', isAuthenticated, upload.single('file'),
    new CreateProductController().handle );

router.get('/category/product', isAuthenticated, new ListByCategoryProduct().handle);

// -- ROTAS ORDER --
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.get('/order', isAuthenticated, new ListOrderController().handle);
router.delete('/order', isAuthenticated, new RemoverOrderController().handle);
// -- ITEM --
router.post('/order/add', isAuthenticated, new AddItemController().handle);


export { router };
