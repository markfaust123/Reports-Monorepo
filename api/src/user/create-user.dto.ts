import {
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
  IsBoolean,
} from "class-validator";

export class CreateUserDTO {
  @IsString()
  @MinLength(1, { message: "Jhed is too short" })
  @MaxLength(10, { message: "Jhed is too long" })
  jhed: string;

  @IsString()
  @MinLength(8, { message: "Password is too short" })
  password: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(4, { message: "Class year must be in YYYY format" })
  @MaxLength(4, { message: "Class year must be in YYYY format" })
  classYear: string;

  @IsString()
  teamName: string;

  @IsString()
  position: string;

  @IsBoolean()
  isChief: boolean;

  @IsOptional()
  @IsString()
  avatarUrl: string;
}
