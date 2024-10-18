export type ReadImage = { id: number; recipeId: number; base64: string | null; timestamp: Date };

export type CreateImage = Omit<ReadImage, "id" | "recipeId" | "timestamp">;

export type UpdateImage = Omit<ReadImage, "timestamp">;
