import { readFileSync } from "fs";
import { join } from "node:path";
import { fileURLToPath, resolve } from "node:url";
// import { join } from "path";

// @ts-ignore
let root = import.meta.url
root = resolve(root, join('..', '..'))

/**
 * Get a data file from the data directory in ESM
 *
 * @param file the path to the file to retrieve data for.
 * @returns the data from the file
 */
export function readRelativeFile(pathParts: string[]): string {
  const relativePath = join(...pathParts)
  return readFileSync(fileURLToPath(resolve(root, relativePath)), 'utf-8')
}