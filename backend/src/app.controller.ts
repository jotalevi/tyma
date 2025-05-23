import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { Public } from "modules/auth/public.decorator";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("health")
  @Public()
  status(): Record<string, any> {
    return this.appService.getMetrics();
  }
}
