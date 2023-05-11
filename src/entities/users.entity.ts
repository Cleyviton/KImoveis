import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import Schedule from "./schedule.entity";
import { getRounds, hashSync } from "bcryptjs";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  name: string;

  @Column({ type: "varchar", length: 45, unique: true })
  email: string;

  @Column({ type: "boolean", default: false })
  admin: boolean;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @CreateDateColumn({ type: "date" })
  createdAt?: Date | string;

  @UpdateDateColumn({ type: "date" })
  updatedAt?: Date | string;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: string | Date | null | undefined;

  @OneToMany(() => Schedule, (Schedule) => Schedule.user)
  schedule: Schedule;

  @BeforeInsert()
  @BeforeUpdate()
  transformPasswordHash() {
    const encrypted = getRounds(this.password);

    if (!encrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default User;
