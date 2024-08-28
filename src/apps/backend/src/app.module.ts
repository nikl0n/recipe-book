import { Module } from "@nestjs/common";

import { CategoryModule } from "./modules/category/category.module";
import { ImageModule } from "./modules/image/image.module";
import { IngredientModule } from "./modules/ingredient/ingredient.module";
import { RecipeModule } from "./modules/recipe/recipe.module";
import { StepModule } from "./modules/step/step.module";
import { UnitModule } from "./modules/unit/unit.module";

@Module({
  imports: [CategoryModule, ImageModule, IngredientModule, RecipeModule, StepModule, UnitModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
