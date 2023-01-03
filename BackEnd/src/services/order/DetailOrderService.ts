import prismaClient from '../../prisma';

interface IDetailRequest {
  order_id: string;
}
class DetailOrderService {
  async execute({ order_id }: IDetailRequest) {
    const orders = await prismaClient.item.findMany({
      where: {
        order_id: order_id,
      },
      include: {
        product: true,
        order: true,
      },
      orderBy:{
        created_at: 'desc'
      }
    });

    return orders;

  }
}

export {DetailOrderService};
