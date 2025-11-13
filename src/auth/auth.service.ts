import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto, LoginDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  private userList: any = [
    {
      id: 1,
      username: "Ali",
      email: "dcsdcd",
      password: "sdcdc"
    },
    {
      id: 2,
      username: "Bunyod",
      email: "dcsdcd",
      password: "sdcdc"
    },
  ]
  async register(createAuthDto: CreateAuthDto) {
    const { username, email, password } = createAuthDto

    const foundedUser = this.userList.find(user => user.email === email)

    if(foundedUser) throw new BadRequestException("User alerady exisist")

    this.userList.push(createAuthDto)

    return {message: "Registered"}
  }

  login(loginDto: LoginDto) {
    const { username, password } = loginDto
    const foundedUser = this.userList.find(item => item.username === username)
    const passwordVerify = this.userList.find(item => item.password === password)

    if (!foundedUser || !passwordVerify) {
      throw new BadRequestException("parol yoki foydalanuvchi nomi xato")
    }
    return btoa(foundedUser.username);
  }

}
