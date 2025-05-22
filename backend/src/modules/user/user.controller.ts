import { Controller, Get, Post, Put, Param, Body, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { Public } from "../auth/public.decorator";
import CreateUserDto from "dto/createUser.dto";
import UpdateUserDto from "dto/updateUser.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Public()
  async create(@Body() dto: CreateUserDto): Promise<User> {
    return this.userService.create(dto);
  }

  @Get()
  async get(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get("me")
  async getMe(@Req() req): Promise<User> {
    return req.user;
  }

  @Public()
  @Get("pending-reset/:rut")
  async pendingReset(@Param("rut") rut: string): Promise<boolean> {
    return this.userService.pendingReset(parseInt(rut));
  }

  @Get(":id")
  async getById(@Param("id") id: string): Promise<User> {
    return this.userService.findByRut(parseInt(id));
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() data: UpdateUserDto): Promise<User> {
    return this.userService.update(parseInt(id), data);
  }

  @Put("activate/:id")
  async activate(@Param("id") id: string): Promise<User> {
    return this.userService.activate(parseInt(id));
  }
}
