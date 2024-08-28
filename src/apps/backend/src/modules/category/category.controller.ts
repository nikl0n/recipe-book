import { Controller, Get } from "@nestjs/common";

import { CategoryService } from "./category.service";

@Controller("api/v1/categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findMany() {
    return this.categoryService.findMany();
  }
}
