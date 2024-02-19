import { Comment } from "src/comments/comment.entity";
import { Report } from "src/reports/report.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  jhed: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  classYear: string;

  @Column()
  teamName: string;

  @Column()
  position: string;

  @Column()
  isChief: boolean;

  @Column({ nullable: true })
  avatarUrl: string;

  // Establish connection with Report entity
  @OneToMany(() => Report, (report) => report.user)
  reports: Report[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}
