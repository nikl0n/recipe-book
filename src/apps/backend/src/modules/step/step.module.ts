import { Module } from "@nestjs/common";

import { StepController } from "./step.controller";
import { StepService } from "./step.service";

@Module({
  controllers: [StepController],
  providers: [StepService],
  exports: [StepService],
})
export class StepModule {}
