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
import {ListAllProductController} from './controllers/product/ListAllProductController';
// -- ORDER --
import { CreateOrderController } from './controllers/order/CreateOrderController';
import { RemoverOrderController } from './controllers/order/RemoverOrderController';
import { ListOrderController } from './controllers/order/ListOrderController';
// -- ITEM --
import { AddItemController } from './controllers/order/AddItemController';
import {ListAllItemsController} from './controllers/order/ListAllItemsController';
import {RemoveItemController} from './controllers/order/RemoveItemController';
import {SendOrderController} from './controllers/order/SendOrderController';
import {DetailOrderController} from './controllers/order/DetailOrderController';
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
router.get('/products', isAuthenticated, new ListAllProductController().handle);

// -- ROTAS ORDER --
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.get('/order', isAuthenticated, new ListOrderController().handle);
router.delete('/order', isAuthenticated, new RemoverOrderController().handle);
// -- ITEM --
router.post('/order/add', isAuthenticated, new AddItemController().handle);
router.get('/order/list', isAuthenticated, new ListAllItemsController().handle);
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get('/order/detail', isAuthenticated, new DetailOrderController().handle);


export { router };
