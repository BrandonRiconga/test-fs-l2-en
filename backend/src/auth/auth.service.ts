import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if(user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const { password, ...result } = user; // Exclude password from the result
        return result;
      }
      else{
        console.log(`Invalid password for user with email: ${email}`);
      }
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '1d' }),
    };
  }

  async register(userDto: any) {
    const existingUser = await this.usersService.findByEmail(userDto.email);
    if (existingUser) {
      throw new UnauthorizedException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const newUser = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    })

    const comparePass = await bcrypt.compare(userDto.password, hashedPassword);
    //exclude password
    const { password, ...result } = newUser;

    return {
      user: result,
      access_token: this.jwtService.sign({ email: newUser.email, sub: newUser.id }),
    };
  }
}
