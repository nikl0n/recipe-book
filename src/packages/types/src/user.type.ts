export type ReadUser = { name: string; token: string };

export type CreateUser = Omit<ReadUser, "token"> & { password: string };
