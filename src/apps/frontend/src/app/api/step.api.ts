import { Injectable } from "@angular/core";

export type ReadStep = {
  id: number;
  recipeId: number;
  order: number;
  text: string;
  timestamp: Date;
};
export type CreateStep = Omit<ReadStep, "id" | "recipeId" | "timestamp">;
export type UpdateStep = Omit<ReadStep, "timestamp">;

@Injectable({ providedIn: "root" })
export class StepApi {
  // private readonly http = inject(HttpClient);
  // private readonly baseUrl = `${environment.api.baseUrl}/api/v1/steps`;
}
