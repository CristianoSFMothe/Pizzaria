import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Receber o token
  const authToken = req.headers.authorization;

  // Verificar se recebeu o token
  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  // Validar o token
  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

    // Recupera o ID do token e por numa variável do Request
    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}
