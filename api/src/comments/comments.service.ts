import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";
import { ILike, Repository } from "typeorm";
import { CreateCommentDTO } from "./comment-create.dto";
import { ReportsService } from "src/reports/reports.service";

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    private readonly reportsService: ReportsService,
  ) {}

  // Returns all comments that match the given criteria.
  async findAll(
    limit: number,
    offset: number,
    reportId?: string,
    userId?: number,
    search?: string,
    withUserData?: boolean,
    withReportData?: boolean,
  ): Promise<Comment[]> {
    const content = search ? ILike(`%${search}%`) : undefined;
    const relations = [];

    if (withUserData) {
      relations.push("user");
    }

    if (withReportData) {
      relations.push("report");
    }

    const comments = await this.commentRepository.find({
      take: limit,
      skip: offset,
      where: [
        {
          reportId,
          userId,
          content,
        },
      ],
      order: {
        timestamp: "DESC",
      },
      relations,
    });

    return comments;
  }

  // Creates a new instance of the Comment entity and saves it to the database.
  // Returns the newly created comment.
  async create(
    createCommentDto: CreateCommentDTO,
    reportId: string,
    userId: number,
  ): Promise<Comment> {
    const comment = this.commentRepository.create({
      ...createCommentDto,
      reportId, // Associate the comment with a report
      userId, // Associate the comment with a user
    });

    // Increment the comment counter in the associated report
    await this.reportsService.incrementCommentCounter(reportId);

    return this.commentRepository.save(comment);
  }
}
