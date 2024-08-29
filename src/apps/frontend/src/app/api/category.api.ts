import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { environment } from "../../environment/environment";

export type Category = {
  id: number;
  name: string;
};

@Injectable({ providedIn: "root" })
export class CategoryApi {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.api.baseUrl}/api/v1/categories`;

  fetchMany() {
    return this.http.get<Category[]>(this.baseUrl);
  }
}