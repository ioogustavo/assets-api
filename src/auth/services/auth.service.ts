import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client'; // ojo, aquí no es PrismaService
import { LoginDto } from '../dto/login.dto';
import { AuthResponse } from '../interface/authResponse.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('PRISMA') private prisma: PrismaClient, // inyectamos el cliente
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<AuthResponse> {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
    });

    if (!user) throw new UnauthorizedException('Usuario no encontrado');
    if (user.password !== dto.password)
      throw new UnauthorizedException('Contraseña incorrecta');

    const payload = { sub: user.id, username: user.username };
    return { access_token: this.jwtService.sign(payload) };
  }
}
