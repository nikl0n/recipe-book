import { Logger, Module, OnModuleInit } from "@nestjs/common";

import { PrismaClient } from "@prisma/client";

import { CategoryModule } from "./modules/category/category.module";
import { ImageModule } from "./modules/image/image.module";
import { IngredientModule } from "./modules/ingredient/ingredient.module";
import { RecipeModule } from "./modules/recipe/recipe.module";
import { StepModule } from "./modules/step/step.module";
import { UnitModule } from "./modules/unit/unit.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    CategoryModule,
    ImageModule,
    IngredientModule,
    RecipeModule,
    StepModule,
    UnitModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  prisma = new PrismaClient();
  logger = new Logger(AppModule.name);

  async onModuleInit() {
    try {
      await this.prisma.$connect();

      this.logger.log("Database connection established");
    } catch (error) {
      this.logger.error("Unable to connect to the database");

      process.exit(1);
    }
  }
}
