import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { ReadUnit } from "@packages/types";

import { environment } from "../../environment/environment";

@Injectable({ providedIn: "root" })
export class UnitApi {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.api.baseUrl}/api/v1/units`;

  fetchMany() {
    return this.http.get<ReadUnit[]>(this.baseUrl);
  }
}
