import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from '../auth/enums/role.enum';
import { Item } from './item.entity';
import { Bid } from './bid.entity';
import { Review } from './rewiew.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  verified: boolean;

  @Column({ nullable: true })
  avatar: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  lastLogin: Date;

  @Column({ nullable: true })
  hashedRefreshToken: string;

  // ✅ Ulubione produkty
  @ManyToMany(() => Item, (item) => item.likedBy)
  @JoinTable({ name: 'user_favorites' })
  favorites: Item[];

  // ✅ Oferty użytkownika (bids)
  @OneToMany(() => Bid, (bid) => bid.user)
  bids: Bid[];

  // ✅ Wystawione przedmioty
  @OneToMany(() => Item, (item) => item.owner)
  ownedItems: Item[];

  // ✅ Recenzje użytkownika
  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
