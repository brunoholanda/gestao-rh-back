import { Controller, Request, Post, Get, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';  // Certifique-se que este arquivo está corretamente configurado
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return this.authService.login(req.user);
  }

  // Nova rota adicionada
  @UseGuards(JwtAuthGuard)
  @Get('company-log-details')
  async getCompanyLogDetails(@Request() req) {
    const companyId = req.user.company_id;
    return { company_id: companyId };
  }
}
