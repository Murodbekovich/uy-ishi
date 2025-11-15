import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth) private authModel: typeof Auth) { }
  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto
    const user = await this.authModel.findOne({ where: { email } })

    if (user) throw new BadRequestException("User alerady exitst")

    const hashPassword = await bcrypt.hash(password, 12)

    const randomPassword = +Array.from({length: 6}, () => Math.floor(Math.random() * 10)).join("")


    // await this this.authModel.create({username, email, hashPassword})
    return
  }
}
