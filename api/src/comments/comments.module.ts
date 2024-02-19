import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Comment } from "./comment.entity";
import { CommentsService } from "./comments.service";
import { CommentsController } from "./comments.controller";
import { ReportsService } from "src/reports/reports.service";
import { Report } from "src/reports/report.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Report])],
  providers: [CommentsService, ReportsService],
  controllers: [CommentsController],
})
export class CommentsModule {}
