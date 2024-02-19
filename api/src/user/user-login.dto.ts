import { IsNotEmpty, IsString } from "class-validator";

export class UserLoginDTO {
  @IsString()
  @IsNotEmpty()
  jhed: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
