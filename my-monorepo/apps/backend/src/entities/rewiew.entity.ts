import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Item } from './item.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (item) => item.reviews)
  @JoinColumn({ name: 'productId' })
  product: Item;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  rating: number;

  @Column()
  comment: string;

  @Column()
  createdAt: Date;
}
