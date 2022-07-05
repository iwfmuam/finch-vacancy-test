export const getRandomSlice = (n: number, m: number) => {
  return Array.from({ length: n }, (_, i) => ({
    i,
    r: Math.random(),
  }))
    .sort((a, b) => a.r - b.r)
    .map(({ i }) => i)
    .slice(0, m)
    .sort((a, b) => a - b);
};
