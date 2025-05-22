import { Controller, Post, Body, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Public } from "./public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  async login(@Body() credentials: { rut: number; password: string }) {
    const { rut, password } = credentials;
    
    const user = await this.authService.validateUser(rut, password);
    
    if (!user) {
      throw new UnauthorizedException("Invalid credentials");
    }

    return this.authService.login(user);
  }

  @Public()
  @Post("forgot-password")
  async forgotPass(@Body() credentials: { rut: number }) {
    const { rut } = credentials;

    return this.authService.forgotPassword(rut);
  }

  @Public()
  @Post("change-password")
  async changePass(
    @Body()
    credentials: {
      rut: number;
      oldPassword: string;
      newPassword: string;
    }
  ) {
    const { rut, oldPassword, newPassword } = credentials;

    return this.authService.setNewPassword(rut, oldPassword, newPassword);
  }
}
