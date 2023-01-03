import {Request, Response} from 'express';
import {ListAllProductsService} from '../../services/product/ListAllProductsService';
import prismaClient from "../../prisma";

class ListAllProductController {
  public async handle(req: Request, res: Response) {
    const listAllProductsService = new ListAllProductsService();

    const products = await listAllProductsService.execute();

    return res.json(products);
  }
}

export {ListAllProductController};
