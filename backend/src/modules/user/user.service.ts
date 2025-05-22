import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { randomBytes } from "crypto";
import { EmailService } from "modules/email/email.service";
import CreateUserDto from "dto/createUser.dto";
import UpdateUserDto from "dto/updateUser.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly emailService: EmailService
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const founduser = await this.userRepository.findOne({
      where: { email: dto.email }
    });

    if (founduser) dto.email = dto.email.split("@")[0] + "+" + dto.rut.toString() + "@" + dto.email.split("@")[1];

    const user = this.userRepository.create();


    user.rut = dto.rut;
    user.dv = dto.dv;
    user.names = dto.names;
    user.surnames = dto.surnames;
    user.email = dto.email;

    const pw = this.generateSecurePassword(12);
    user.password = await User.hashPassword(pw);

    await this.emailService.sendTemplateEmail(
      [user.email],
      "Bienvenido a la App Sauce",
      [],
      [user.email],
      "newAccount",
      {
        user_rut: `${user.rut}-${user.dv}`,
        user_mail: user.email,
        user_name: `${user.names} ${user.surnames}`,
        user_password: pw
      }
    );
    user.requiresPasswordReset = true;

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      where: { isActive: true },
      order: { surnames: "ASC" },
    });
  }

  async pendingReset(rut: number): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { rut }
    });

    if (!user) throw new NotFoundException("User not found");

    return user.requiresPasswordReset;
  }

  async findByRut(rut: number): Promise<User> {
    return this.userRepository.findOne({
      where: { rut },
    });
  }

  async update(rut: number, data: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { rut } });
    if (!user) throw new NotFoundException("User not found");

    user.names = data.names ?? user.names;
    user.surnames = data.surnames ?? user.surnames;
    user.email = data.email ?? user.email;

    return this.userRepository.save(user);
  }

  async activate(rut: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { rut } });
    user.isActive = !user.isActive;
    return this.userRepository.save(user);
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
