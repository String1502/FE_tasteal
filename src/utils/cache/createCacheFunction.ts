/**
 * Creates a caching function that memoizes the results of a given function.
 *
 * @param {function} fn - The function to be memoized.
 * @return {function} The memoized function.
 */
function createCacheFunction<TValue extends unknown[], TResult>(
  fn: (args: TValue) => TResult
) {
  const cache: Record<string, TResult> = {};

  return (...args: TValue) => {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    } else {
      const result = fn(args);
      cache[key] = result;
      return result;
    }
  };
}

export default createCacheFunction;
