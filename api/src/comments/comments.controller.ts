import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { CommentsService } from "./comments.service";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { UserId } from "src/decorators/user-id.decorator";
import { CommentResponseDTO } from "./comment-response.dto";
import { CreateCommentDTO } from "./comment-create.dto";
import { FindCommentsQueryDTO } from "./find-comments-query.dto";
import { FindCommentsResponseDTO } from "./find-comments-response.dto";

@UseGuards(JwtAuthGuard)
@Controller("reports/:reportId/comments")
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  async findAll(
    @Param("reportId") reportId: string,
    @Query() query: FindCommentsQueryDTO,
  ): Promise<FindCommentsResponseDTO> {
    const { limit, offset, search, withReportData, withUserData } = query;

    const comments = await this.commentsService.findAll(
      limit,
      offset,
      reportId,
      undefined,
      search,
      withUserData,
      withReportData,
    );

    return {
      limit,
      offset,
      search,
      withUserData,
      withReportData,
      data: comments.map((comment) => {
        if (withUserData) {
          delete comment.user.password;
        }
        return comment;
      }),
    };
  }

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDTO,
    @Param("reportId") reportId: string,
    @UserId() userId: number,
  ): Promise<CommentResponseDTO> {
    return await this.commentsService.create(
      createCommentDto,
      reportId,
      userId,
    );
  }
}
