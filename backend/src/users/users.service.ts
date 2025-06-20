import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { authenticate } from 'passport';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(userData: Partial<User>): Promise<User> {
    if(!userData.password){
      throw new Error('Password is required to create a user');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword, // Hash the password before saving
    });
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async update(id: number, userData: Partial<User>, authenticatedUserId: number): Promise<User> {
    if(id !== authenticatedUserId) {
      throw new ForbiddenException(`You are not allowed to update this user`);
    }

    const user = await this.findOne(id);
    if(!user) {
      throw new ForbiddenException(`User with ID ${id} not found`);
    }

    if(userData.password){
      const hashedPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashedPassword;
    }

    await this.usersRepository.update(id, userData);

    const updatedUser = await this.findOne(id);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found after update`);
    }
    return updatedUser;
  }

  async remove(id: number, authenticatedUserId: number): Promise<void> {
    if(id !== authenticatedUserId) {
      throw new ForbiddenException(`You are not allowed to delete this user`);
    }

    const result = await this.usersRepository.delete(id);
    if(result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
