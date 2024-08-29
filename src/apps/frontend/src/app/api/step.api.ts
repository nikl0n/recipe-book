import { Injectable } from "@angular/core";

export type Step = {
  id: number;
  recipeId: number;
  order: number;
  text: number;
  timestamp: Date;
};

@Injectable({ providedIn: "root" })
export class StepApi {
  // private readonly http = inject(HttpClient);
  // private readonly baseUrl = `${environment.api.baseUrl}/api/v1/steps`;
}
