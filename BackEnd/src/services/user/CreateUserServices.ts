interface  UserRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserServices {
    async execute({ name, email, password }: UserRequest ) {
        console.log('nome, name');
        return { name: name };
    }
}

export { CreateUserServices };