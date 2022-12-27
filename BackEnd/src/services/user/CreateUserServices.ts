import prismaClient from '../../prisma';
import {hash} from 'bcryptjs';

'bcryptjs';

interface IUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserServices {
  async execute({name, email, password}: IUserRequest) {
    // Verificar se enviou email
    if (!email) {
      throw new Error('Email incorrect');
    }

    // Verificar se esse email já está cadastrado na plaforma
    const userAlreadyExistsEmail = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });

    // Criptografando a senha
    const passwordhash = await hash(password, 8);

    if (userAlreadyExistsEmail) {
      throw new Error('User already exists email');
    }

    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        password: passwordhash
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return user;
  }
}

export {CreateUserServices};
