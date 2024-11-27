export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const simulateNetworkDelay = async <T>(data: T): Promise<T> => {
  await delay(1500); // 1.5 second delay
  return data;
};

export const simulateError = async (): Promise<never> => {
  await delay(1000);
  throw new Error('Simulated network error');
};

// Usage example:
// const data = await simulateNetworkDelay(yourData);
// or
// try {
//   await simulateError();
// } catch (error) {
//   // Handle error
// }
