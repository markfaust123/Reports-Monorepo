import { UserResponseDTO } from "src/user/user-response.dto";

export class ReportResponseDto {
  id: string;
  title: string;
  description: string;
  url: string;
  readCount: number;
  commentCount: number;
  timestamp: Date;
  user?: UserResponseDTO;
}
