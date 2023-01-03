import prismaClient from '../../prisma';
class ListOrderService {
  async execute() {
    const order = await prismaClient.order.findMany();

    return {
      data: {
        order,
      }
    };
  }
}

export {ListOrderService};
