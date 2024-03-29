import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CreateUserDTO } from "./create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOne(jhed: string): Promise<User | undefined> {
    return this.userRepository.findOneBy({ jhed });
  }

  // You can add more methods as required, like createUser, updateUser, etc.
  async createUser(userDto: CreateUserDTO): Promise<User> {
    const { password, ...userInfo } = userDto;
    const user = await this.userRepository.create({
      ...userInfo,
      password: await bcrypt.hash(password, 10),
    });
    return this.userRepository.save(user);
  }
}
