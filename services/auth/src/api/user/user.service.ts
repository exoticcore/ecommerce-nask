import { dataSource } from '@config/typeorm.config';
import { User } from '../../database/user.entity';
import { Person } from '../person/person.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';

export default class UserService {
  private userRepo: Repository<User>;

  constructor() {
    this.userRepo = dataSource.getRepository(User);
  }

  public async getUserByPerson(person: Person): Promise<User | null> {
    const userInfo = await this.userRepo.findOne({
      where: { person: { id: person.id } },
      relations: { person: true },
    });
    return userInfo;
  }

  public async getUserByEmail(email: string): Promise<User | null> {
    const userInfo = await this.userRepo.findOne({
      where: { person: { email } },
      relations: { person: true },
    });
    return userInfo;
  }

  public async createUser(createUserDTO: CreateUserDTO) {
    // const isUser = await this.getUserByEmail(createUserDTO.person.email);
    // if (isUser) return null;

    const newUser = await this.userRepo.save({ ...createUserDTO });

    return newUser;
  }

  public async updateUser(updateUserDTO: UpdateUserDTO) {
    const isUser = await this.getUserByEmail(updateUserDTO.person.email);
    if (!isUser) return null;

    const updatedUser = await this.userRepo.save({
      ...isUser,
      ...updateUserDTO,
    });

    console.log(updatedUser);

    return updatedUser;
  }

  public async verifyUser(email: string) {
    const isUser = await this.getUserByEmail(email);

    const verifiedUser = await this.userRepo.save({
      ...isUser,
      isVerified: true,
    });

    return verifiedUser;
  }

  public async blockUser(email: string) {
    const isUser = await this.getUserByEmail(email);
    if (!isUser) return null;

    const blockedUser = await this.userRepo.save({ ...isUser, blocked: true });

    return blockedUser;
  }
}
