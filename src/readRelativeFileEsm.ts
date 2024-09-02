import { readFile } from "fs/promises";
import { join } from "node:path";
import { fileURLToPath, resolve } from "node:url";

// @ts-ignore
let root = import.meta.url
root = resolve(root, join('..', '..'))
const fileSystem = root.startsWith('file://')

/**
 * Get a data file from the data directory in ESM
 *
 * @param file the path to the file to retrieve data for.
 * @returns the data from the file
 */
export async function readRelativeFile<T>(pathParts: string[]): Promise<T> {
  const relativePath = join(...pathParts)
  if(fileSystem) {
    const contents = await readFile(fileURLToPath(resolve(root, relativePath)), 'utf-8')
    return JSON.parse(contents);
  } else {
    const contents = await fetch(relativePath)
    return await contents.json()
  }
}