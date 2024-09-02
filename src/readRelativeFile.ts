import { readFile } from "fs/promises";
import { join } from "path";

let root = join(__dirname, '..', '..');
if(__dirname.endsWith('src')) {
  root = join(__dirname, '..');
}

/**
 * Get a data file from the data directory in CommonJS
 *
 * @param file the path to the file to retrieve data for.
 * @returns the data from the file
 */
export async function readRelativeFile<T>(pathParts: string[]): Promise<T> {
  const contents = await readFile(join(root, ...pathParts), 'utf8');
  return JSON.parse(contents);
}