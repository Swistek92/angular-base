import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { User } from '../entities/user.entity';
import { Role } from '../auth/enums/role.enum';

export class MainSeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<any> {
    const userRepo = dataSource.getRepository(User);

    const usersToInsert = [
      {
        id: 1,
        email: 'admin@example.com',
        password: 'admin', // hasło zostanie zahashowane przez @BeforeInsert
        name: 'Admin',
        role: Role.ADMIN,
        isActive: true,
        verified: true,
        avatar: 'assets/avatars/admin.png',
        createdAt: new Date('2024-04-01T12:00:00Z'),
        lastLogin: new Date('2024-04-03T15:30:00Z'),
      },
      {
        id: 2,
        email: 'newuser@example.com',
        password: 'secret123',
        name: 'New User',
        role: Role.USER,
        isActive: true,
        verified: false,
        avatar: 'assets/avatars/default.png',
        createdAt: new Date('2024-04-02T08:30:00Z'),
        lastLogin: null,
      },
    ];

    for (const userData of usersToInsert) {
      const user = userRepo.create(userData);
      await userRepo.save(user);
    }

    console.log('✅ Seeded users from JSON');
  }
}
