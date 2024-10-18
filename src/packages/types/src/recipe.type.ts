export type ReadRecipe = {
  id: number;
  userName: string;
  categoryId: number;
  name: string;
  timestamp: Date;
};

export type CreateRecipe = Omit<ReadRecipe, "id" | "userName" | "timestamp">;

export type UpdateRecipe = Omit<ReadRecipe, "timestamp">;
