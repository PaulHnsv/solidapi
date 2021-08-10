import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProviders";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const user = new User(data);
    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "equipe responsável pelo App",
        email: "equipe@meuapp.com.br",
      },
      subject: "Seja bem-vindo à plataforma",
      body: "<p>Parabéns, você já pode fazer login em nossa plataforma</p>",
    });
  }
}
