import { Controller } from "@nestjs/common";

import { StepService } from "./step.service";

export type CreateStep = { order: number; text: string };

@Controller("api/v1/steps")
export class StepController {
  constructor(private readonly stepService: StepService) {}
}
