import prismaClient from '../../prisma';

interface ICategoryRequest {
  name: string;
}

class CreateCategoryService {
  async execute({ name }: ICategoryRequest) {
    // Verificar se nome da categoria não está vázio
    if (name === '') {
      throw new Error('Name invalid!');
    }

    const category = await prismaClient.category.create({
      data: {
        name: name
      },
      select: {
        id: true,
        name: true,
      }
    });

    return category;


  }
}

export { CreateCategoryService };
