import {Request, Response} from 'express'
import {ListAllItemsService} from '../../services/order/ListAllItemsService'

class ListAllItemsController {
  async handle(req: Request, res: Response) {
    const listAllItemsService = new ListAllItemsService();

    const items = await listAllItemsService.execute();



    return res.json(items);

  }
}

export {ListAllItemsController}
