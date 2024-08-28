import { Controller, Get } from "@nestjs/common";

import { UnitService } from "./unit.service";

@Controller("api/v1/units")
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Get()
  findMany() {
    return this.unitService.findMany();
  }
}
