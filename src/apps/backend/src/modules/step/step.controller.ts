import { Controller } from "@nestjs/common";

import { StepService } from "./step.service";

export type ReadStep = {
  id: number;
  recipeId: number;
  order: number;
  text: string;
  timestamp: Date;
};
export type CreateStep = Omit<ReadStep, "id" | "recipeId" | "timestamp">;
export type UpdateStep = Omit<ReadStep, "timestamp">;

@Controller("api/v1/steps")
export class StepController {
  constructor(private readonly stepService: StepService) {}
}
