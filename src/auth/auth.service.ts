import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      console.log('Usuário validado:', result); // Verifique se company_id aparece aqui
      return result;
    }
    return null;
  }
  

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, company_id: user.company_id };
    console.log('Payload:', payload); // Adicione esse log para verificar o conteúdo do payload
    return {
      access_token: this.jwtService.sign(payload),
      company_id: user.company_id,  // Aqui é onde o company_id deveria ser retornado
      user_type: user.userType,     // Verifique também o userType
    };
  }
  
}
