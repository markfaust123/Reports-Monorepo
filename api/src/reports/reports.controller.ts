import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ReportsService } from "./reports.service";
import { CreateReportDto } from "./create-report.dto";
import { ReportResponseDto } from "./report-response.dto";
import { UpdateReportDto } from "./update-report.dto";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UserId } from "src/decorators/user-id.decorator";
import { ReportOwnershipGuard } from "src/guards/report-owner.guard";
import { UserService } from "src/user/user.service";
import { FindReportsQueryDto } from "./find-reports-query.dto";
import { FindReportsResponseDto } from "./find-reports-response.dto";

@Controller("reports")
export class ReportsController {
  constructor(
    private readonly reportsService: ReportsService,
    private readonly userService: UserService,
  ) {}

  // Get Report endpoint
  @Get(":id")
  async findOne(
    @Param("id") id: string,
    @Query("withUserData") withUserData?: boolean,
  ): Promise<ReportResponseDto> {
    const report = await this.reportsService.findOne(id, withUserData);
    if (!report) {
      throw new NotFoundException(`Report with ID ${id} no found`);
    }
    delete report.userId;

    if (withUserData) {
      delete report.user.password;
    }
    return report;
  }

  // Get All Reports endpoint
  @Get()
  async findAll(
    @Query() query: FindReportsQueryDto,
  ): Promise<FindReportsResponseDto> {
    const { limit, offset, search, jhed, withUserData } = query;

    let userId: number | undefined;

    if (jhed) {
      const user = await this.userService.findOne(jhed);
      if (!user) {
        throw new NotFoundException(`User with jhed ${jhed} not found`);
      }
      userId = user.id;
    }

    const reports = await this.reportsService.findAll(
      limit,
      offset,
      search,
      userId,
      withUserData,
    );

    return {
      limit,
      offset,
      jhed,
      search,
      withUserData,
      data: reports.map((report) => {
        delete report.userId;
        if (report.user) {
          delete report.user.password;
        }
        return report as ReportResponseDto;
      }),
    };
  }

  // Create Report endpoint
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createReportDto: CreateReportDto,
    @UserId() userId: number,
  ): Promise<ReportResponseDto> {
    const report = await this.reportsService.create(createReportDto, userId);
    delete report.userId;
    return report;
  }

  // Update Report endpoint
  @UseGuards(JwtAuthGuard, ReportOwnershipGuard)
  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateReportDto: UpdateReportDto,
  ): Promise<ReportResponseDto> {
    const report = await this.reportsService.update(id, updateReportDto);
    delete report.userId;
    return report;
  }

  // Delete Report endpoint
  @UseGuards(JwtAuthGuard, ReportOwnershipGuard)
  @Delete(":id")
  async remove(
    @Param("id") id: string,
  ): Promise<{ statusCode: number; message: string }> {
    // ReportOwnershipGuard ensure that Report with this id exists
    await this.reportsService.remove(id);
    return {
      statusCode: 200,
      message: "Report deleted successfully",
    };
  }
}
