/**
 * Simulates a delay for the specified number of seconds.
 * @param seconds - The duration of the delay in seconds.
 * @returns A Promise that resolves after the specified delay.
 */
function simulateDelay(seconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

export default simulateDelay;
