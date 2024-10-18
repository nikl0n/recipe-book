export type ReadIngredient = {
  id: number;
  recipeId: number;
  unitId: number;
  name: string;
  amount: number;
  timestamp: Date;
};

export type CreateIngredient = Omit<ReadIngredient, "id" | "recipeId" | "timestamp">;

export type UpdateIngredient = Omit<ReadIngredient, "timestamp">;
