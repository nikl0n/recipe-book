import { Injectable } from "@angular/core";

export type Image = {
  id: number;
  recipeId: number;
  base64: string;
  timestamp: Date;
};

@Injectable({ providedIn: "root" })
export class ImageApi {
  // private readonly http = inject(HttpClient);
  // private readonly baseUrl = `${environment.api.baseUrl}/api/v1/images`;
}
