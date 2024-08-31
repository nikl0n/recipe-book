import { Controller, Get } from "@nestjs/common";

import { ImageService } from "./image.service";

@Controller("api/v1/images")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get()
  fetchMany() {
    return this.imageService.findMany();
  }
}
