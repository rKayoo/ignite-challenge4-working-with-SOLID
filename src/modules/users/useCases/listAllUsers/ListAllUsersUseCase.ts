import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userAdmin = this.usersRepository.findById(user_id);

    if (!userAdmin) {
      throw new Error("User not found!");
    } else if (!userAdmin.admin) {
      throw new Error(
        "Access denied! Only admins are able to see this content!"
      );
    }

    const listOfUsers = this.usersRepository.list();

    return listOfUsers;
  }
}

export { ListAllUsersUseCase };
