import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Review } from './rewiew.entity';
import { Bid } from './bid.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @Column('decimal')
  price: number;

  @Column()
  rating: number;

  @ManyToOne(() => User, (user) => user.ownedItems)
  @JoinColumn({ name: 'ownerId' })
  owner: User;

  @Column()
  description: string;

  @Column()
  createdAt: Date;

  @Column()
  category: string;

  @Column({ default: true })
  available: boolean;

  @Column()
  views: number;

  @Column('simple-array') // np. "cotton,summer,unisex"
  tags: string[];

  @Column()
  location: string;

  @ManyToMany(() => User, (user) => user.favorites)
  likedBy: User[];

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];

  @OneToMany(() => Bid, (bid) => bid.product)
  bids: Bid[];
}
