import { Controller } from "@nestjs/common";

import { ImageService } from "./image.service";

export type ReadImage = {
  id: number;
  recipeId: number;
  content: Buffer;
  mimeType: string;
  timestamp: Date;
};
export type CreateImage = { base64: string };
export type UpdateImage = Omit<ReadImage, "timestamp">;

@Controller("api/v1/images")
export class ImageController {
  constructor(private readonly imageService: ImageService) {}
}
