export type ReadStep = {
  id: number;
  recipeId: number;
  order: number;
  text: string;
  timestamp: Date;
};

export type CreateStep = Omit<ReadStep, "id" | "recipeId" | "timestamp">;

export type UpdateStep = Omit<ReadStep, "timestamp">;
