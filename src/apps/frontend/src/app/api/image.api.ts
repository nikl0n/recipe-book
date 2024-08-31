import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { environment } from "../../environment/environment";

export type Image = {
  id: number;
  recipeId: number;
  base64: string;
  timestamp: Date;
};

@Injectable({ providedIn: "root" })
export class ImageApi {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.api.baseUrl}/api/v1/images`;

  fetchMany() {
    return this.http.get<Image[]>(this.baseUrl);
  }
}
