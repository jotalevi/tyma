import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "../user/user.service";
import { User } from "../user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EmailService } from "modules/email/email.service";
import { randomBytes } from "crypto";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async validateUser(rut: number, password: string): Promise<User | null> {
    if (!rut || !password) throw new UnauthorizedException("Invalid credentials");
    
    const user = await this.userService.findByRut(rut);

    if (user && (await user.comparePassword(password))) {
      return user;
    }

    throw new UnauthorizedException("Invalid credentials");
  }

  async login(user: User): Promise<{ accessToken: string }> {
    const payload = { sub: user.rut, email: user.email };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async forgotPassword(rut: number): Promise<void> {
    const user = await this.userService.findByRut(rut);
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const password = this.generateSecurePassword();
    user.password = await User.hashPassword(password);
    user.requiresPasswordReset = true;

    await this.emailService.sendTemplateEmail(
      [user.email],
      "Recuperación de contraseña",
      [],
      [user.email],
      "newPassword",
      {
        user_name: `${user.names} ${user.surnames}`,
        temporary_password: password
      }
    );

    await this.userRepository.save(user);
  }

  async setNewPassword(rut: number, oldPassword: string, newPassword: string): Promise<void> {
    const user = await this.validateUser(rut, oldPassword);

    if (!user) throw new UnauthorizedException("Invalid credentials");

    console.log("got here: " + newPassword);
    user.password = await User.hashPassword(newPassword);
    user.requiresPasswordReset = false;

    await this.userRepository.save(user);
  }

  generateSecurePassword(length = 16): string {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
    const charsetLength = charset.length;

    // Generate random bytes
    const randomValues = randomBytes(length);

    // Map each byte to a character in the charset
    return Array.from(randomValues)
      .map(byte => charset[byte % charsetLength])
      .join("");
  }
}
