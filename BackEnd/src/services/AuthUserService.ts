import prismaClient from '../prisma';
import { compare } from 'bcryptjs';

interface  IAuthRequest {
    email: string;
    password: string;
}

class AuthUserService {
    async execute({ email, password }: IAuthRequest ) {
        // Verificar se email existe
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(!user) {
            throw new Error('User/password incorrect!');
        }

        // Verificar se a senha que enviou está correta
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new Error('User/password incorrect!');
        }



        return { ok: true };

    }
}

export { AuthUserService };