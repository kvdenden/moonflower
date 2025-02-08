import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOrCreateUser(privyId: string) {
    let user = await this.usersRepository.findOne({ where: { privyId } });

    if (!user) {
      user = this.usersRepository.create({ privyId });
      await this.usersRepository.save(user);
    }

    return user;
  }
}
