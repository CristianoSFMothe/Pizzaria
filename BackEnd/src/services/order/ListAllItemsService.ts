import prismaClient from '../../prisma';

class ListAllItemsService {
  async execute() {
    const items = await prismaClient.item.findMany();

    return {
      data: {
        items
      }
    }
  }
}

export { ListAllItemsService };
