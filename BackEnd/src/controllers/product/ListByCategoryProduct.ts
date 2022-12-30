import {Request, Response} from 'express';
import {ListByCategoryService} from '../../services/product/ListByCategoryService';
import prismaClient from "../../prisma";

class ListByCategoryProduct {
  public async handle(req: Request, res: Response) {
    const category_id = req.query.category_id as string;

    const listByCategory = new ListByCategoryService();

    const products = await listByCategory.execute({category_id});

    const categoryIdNotFound = await prismaClient.category.findFirst({
      where: {
        id: category_id
      },
    });

    if (!categoryIdNotFound) {
      res.statusCode = 204
      res.statusMessage = 'Category not found!'
      return res.end();
    }
    return res.json(products);
  }
}

export {ListByCategoryProduct};
