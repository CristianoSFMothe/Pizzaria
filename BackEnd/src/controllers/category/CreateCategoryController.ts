import {Request, Response} from 'express'
import { CreateCategoryService } from '../../services/category/CreateCategoryService'
import prismaClient from "../../prisma";

class CreateCategoryController{
  async handle(req: Request, res: Response){
    const { name } = req.body;

    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({
      name
    });

    // if(category) {
    //   res.statusCode = 422
    //   return res.end();
    // }

    return res.json(category);

  }
}

export { CreateCategoryController }
