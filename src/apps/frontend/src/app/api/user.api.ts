import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { environment } from "../../environment/environment";

export type ReadUser = { id: number; username: string; token: string };
export type CreateUser = Omit<ReadUser, "id" | "token"> & { password: string };

@Injectable({ providedIn: "root" })
export class UserApi {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.api.baseUrl}/api/v1/users`;

  login(user: CreateUser) {
    return this.http.post<ReadUser>(`${this.baseUrl}/login`, user);
  }
}
