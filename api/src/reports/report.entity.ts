import { Comment } from "src/comments/comment.entity";
import { User } from "src/user/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Report {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column({ default: 0 })
  readCount: number;

  @Column({ default: 0 })
  commentCount: number;

  @OneToMany(() => Comment, (comment) => comment.report)
  comments: Comment[];

  // Establish userId column to hold Foreign Key to User table
  @ManyToOne(() => User, (user) => user.reports)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;

  @CreateDateColumn({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  timestamp: Date;
}
