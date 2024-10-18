import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

import { CreateUser, ReadUser } from "@repo/types";

import { environment } from "../../environment/environment";

@Injectable({ providedIn: "root" })
export class UserApi {
  private readonly http = inject(HttpClient);

  private readonly baseUrl = `${environment.api.baseUrl}/api/v1/users`;

  login(user: CreateUser) {
    return this.http.post<ReadUser>(`${this.baseUrl}/login`, user);
  }

  register(user: CreateUser) {
    return this.http.post<ReadUser>(`${this.baseUrl}/register`, user);
  }
}
