import prismaClient from "../../prisma";
import {Request, Response} from 'express';

interface CategoryRequest{
  name: string;
}

class CreateCategoryService{
  async execute({ name }: CategoryRequest){

    if(name === ''){
      throw new Error('Name invalid')
    }

    const nameExists = await prismaClient.category.findFirst({
      where: {
        name: name
      }
    });

    if(nameExists) {
      throw new Error("Category already exists");
    }

    const category = await prismaClient.category.create({
      data:{
        name: name,
      },
      select:{
        id: true,
        name: true,
      }
    })


    return {
      data:{
        category
      }
    };
  }
}

export { CreateCategoryService }
