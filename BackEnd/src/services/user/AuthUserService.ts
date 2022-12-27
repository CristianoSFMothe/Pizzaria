import prismaClient from '../../prisma';
import {compare} from 'bcryptjs';
import {sign} from 'jsonwebtoken';

interface IAuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({email, password}: IAuthRequest) {
    // Verificar se email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new Error('User/password incorrect!');
    }

    // Verificar se a senha que enviou está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('User/password incorrect!');
    }

    // Gerar um token JWT e devolver os dados do usuário como: id, name e email
    const token = sign(
      {
        name: user.name,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d'
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    };

  }
}

export {AuthUserService};