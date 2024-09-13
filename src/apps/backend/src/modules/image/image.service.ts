import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class ImageService {
  prisma = new PrismaClient();

  getBufferMimeTypeFromBase64String(base64: string) {
    const matches = base64.match(/^data:(.*?);base64,(.*)$/);

    if (!matches) return null;

    const mimeType = matches[1];
    const content = Buffer.from(matches[2], "base64");

    return { mimeType, content };
  }

  findFirstByRecipeId(recipeId: number) {
    return this.prisma.image.findFirst({
      where: {
        recipeId,
      },
    });
  }
}
