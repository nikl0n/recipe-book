import { Module } from "@nestjs/common";

import { ImageModule } from "../image/image.module";
import { IngredientModule } from "../ingredient/ingredient.module";
import { StepModule } from "../step/step.module";
import { RecipeController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
  imports: [StepModule, IngredientModule, ImageModule],
})
export class RecipeModule {}