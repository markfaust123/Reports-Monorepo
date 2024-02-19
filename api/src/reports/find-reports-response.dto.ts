import { ReportResponseDto } from "./report-response.dto";

export class FindReportsResponseDto {
  limit: number;
  offset: number;
  search?: string;
  jhed?: string;
  withUserData?: boolean;
  data: ReportResponseDto[];
}
