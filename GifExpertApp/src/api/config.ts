export const getJson = async (url: string) => {
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.error(error);
    return {
      data: [],
      error: error && (error as any)?.message ? (error as any).message : error,
    };
  }
};
