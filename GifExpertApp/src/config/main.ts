export const getEnviroments = (): {
  GIPHY_API_KEY: string;
} => {
  import.meta.env;
  return {
    GIPHY_API_KEY: import.meta.env.VITE_REACT_GIPHY_API_KEY,
  };
};
