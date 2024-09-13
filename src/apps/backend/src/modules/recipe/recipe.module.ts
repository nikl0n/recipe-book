import { Module } from "@nestjs/common";

import { ImageModule } from "../image/image.module";
import { IngredientModule } from "../ingredient/ingredient.module";
import { StepModule } from "../step/step.module";
import { UserModule } from "../user/user.module";
import { RecipeController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";

@Module({
  controllers: [RecipeController],
  providers: [RecipeService],
  exports: [RecipeService],
  imports: [StepModule, IngredientModule, ImageModule, UserModule],
})
export class RecipeModule {}
