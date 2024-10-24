import fs from "fs"
import path from "path"

const CACHE_FILE_DIR = path.resolve(".cache/data")

/**
 * Caches the result of an asynchronous function to avoid multiple calls during build time.
 * This helps prevent hitting external API rate limits by storing the result in a file.
 *
 * @param key A unique identifier for the cached function result
 * @param fn The asynchronous function to be cached
 * @param options Optional parameters to configure cache behavior
 * @returns A new function that returns the cached result or executes the original function if the cache is invalid
 *
 * @example
 * const cachedFetch = cacheAsyncFn('uniqueKey', fetchSomething);
 *
 * await cachedFetch(); // Fetches and caches the data
 * await cachedFetch(); // Returns the cached data without re-fetching
 *
 * @note The cache is stored in the '.next/cache' directory and expires after the `cacheTimeout`
 */

export function cacheAsyncFn<T>(
  key: string,
  // eslint-disable-next-line unused-imports/no-unused-vars
  fn: () => Promise<T>,
  options?: { cacheTimeout?: number }
) {
  const cacheFilePath = path.resolve(CACHE_FILE_DIR, `${key}.json`)

  return async (): Promise<T> => {
    if (fs.existsSync(cacheFilePath)) {
      const fileStats = fs.statSync(cacheFilePath)
      const now = Date.now()
      const cacheAge = now - new Date(fileStats.mtime).getTime()
      const isCacheExpired =
        options?.cacheTimeout && cacheAge > options.cacheTimeout

      if (isCacheExpired) {
        // Remove stale cache
        fs.unlinkSync(cacheFilePath)
        console.log("Stale cache removed", key)
      } else {
        // Cache hit
        const cachedData = fs.readFileSync(cacheFilePath, "utf-8")
        const value = JSON.parse(cachedData)
        console.log("Cache hit", key)
        return value
      }
    } else {
      console.log("Running function for the first time", key)
    }

    const value = await fn()
    console.log("Function ran and cached", key)

    // Ensure cache folder exists
    fs.mkdirSync(CACHE_FILE_DIR, { recursive: true })

    // Write data to cache file
    fs.writeFileSync(cacheFilePath, JSON.stringify(value), "utf-8")
    console.log("Function result cached", key)

    return value
  }
}
