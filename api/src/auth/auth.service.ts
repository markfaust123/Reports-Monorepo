import { Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { UserResponseDTO } from "src/user/user-response.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    jhed: string,
    password: string,
  ): Promise<UserResponseDTO | null> {
    const user = await this.userService.findOne(jhed);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        delete user.password; // Not even the hash password should be exposed!
        return user;
      }
    }
    return null;
  }

  // Generate JSON Web Token (JWT) upon successful user log in
  async login(user: UserResponseDTO) {
    const payload = {
      jhed: user.jhed,
      sub: user.id,
      name: user.name,
      classYear: user.classYear,
      teamName: user.teamName,
      position: user.position,
      isChief: user.isChief,
      avatarUrl: user.avatarUrl,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
