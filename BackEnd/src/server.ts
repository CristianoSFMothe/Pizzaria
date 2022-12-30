import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors';
import cors from 'cors';
import * as path from 'path';

import { router } from './routes'

import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json'

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof Error){
    //Se for uma instancia do tipo error
    return res.status(400).json({
      error: err.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error.'
  });

});

app.listen(process.env.PORT, () => console.log( 'Servidor online 3001!!!!'))
