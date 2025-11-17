import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from "bcrypt"
import nodemailer from "nodemailer"

@Injectable()
export class AuthService {
  private transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amatovbunyodbek671@gmail.com",
      pass: process.env.API_KEY
    }
  })
  constructor(@InjectModel(Auth) private authModel: typeof Auth) { }
  async register(registerDto: RegisterDto) {
    const { username, email, password } = registerDto
    const user = await this.authModel.findOne({ where: { email } })

    if (user) throw new BadRequestException("User alerady exitst")

    const hashPassword = await bcrypt.hash(password, 12)

    const randomNumber = +Array.from({length: 6}, () => Math.floor(Math.random() * 10)).join("")

    const otpTime = Date.now() + 120000

    await this.authModel.create({username, email, hashPassword, otp: randomNumber, otpTime})
    // return
  }
}