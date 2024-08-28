import { Controller } from "@nestjs/common";

import { StepService } from "./step.service";

@Controller("api/v1/steps")
export class StepController {
  constructor(private readonly stepService: StepService) {}
}
