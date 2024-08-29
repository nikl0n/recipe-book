export type Environment = {
  production: boolean;
  api: {
    baseUrl: string;
  };
};

export const environment: Environment = {
  production: false,
  api: {
    baseUrl: "http://localhost:3000",
  },
};
