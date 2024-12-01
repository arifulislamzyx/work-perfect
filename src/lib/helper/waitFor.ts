export const WaitFor = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
