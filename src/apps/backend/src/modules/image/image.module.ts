import { forwardRef, Module } from "@nestjs/common";

import { RecipeModule } from "../recipe/recipe.module";
import { ImageController } from "./image.controller";
import { ImageService } from "./image.service";

@Module({
  imports: [forwardRef(() => RecipeModule)],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
