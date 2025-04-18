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
export class Bid {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Item, (item) => item.bids)
  @JoinColumn({ name: 'productId' })
  product: Item;

  @ManyToOne(() => User, (user) => user.bids)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column('decimal')
  amount: number;

  @Column()
  createdAt: Date;
}
