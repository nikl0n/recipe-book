import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { environment } from "../../environment/environment";

export type ReadImage = { id: number; recipeId: number; base64: string | null; timestamp: Date };
export type CreateImage = Omit<ReadImage, "id" | "recipeId" | "timestamp">;
export type UpdateImage = Omit<ReadImage, "timestamp">;

@Injectable({ providedIn: "root" })
export class ImageApi {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.api.baseUrl}/api/v1/images`;
}
