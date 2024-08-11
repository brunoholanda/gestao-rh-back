import { Controller, Request, Post, Get, UseGuards, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CompaniesService } from '../companies/companies.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private companiesService: CompaniesService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    if (!req.user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('company-log-details')
  async getCompanyLogDetails(@Request() req) {
    const userId = req.user.sub;
    const companyId = req.user.company_id;

    // Obtém o nome do usuário
    const user = await this.usersService.findOneById(userId);
    const userName = user.name;

    // Obtém o nome da empresa
    const company = await this.companiesService.findOne(companyId);
    const companyName = company.company_name;

    return {
      company_id: companyId,
      user_type: user.userType,
      company_name: companyName,
      user_name: userName,
    };
  }
}
