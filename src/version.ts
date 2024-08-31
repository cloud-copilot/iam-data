import { readRelativeFile } from "./readRelativeFile.js";

let versionCache: string | undefined = undefined;

/**
 * Get the version of the package
 */
export function iamDataVersion(): string {
  if(!versionCache) {
    const data = readRelativeFile(['package.json']);
    const packageInfo = JSON.parse(data);
    versionCache = packageInfo.version;
  }

  return versionCache!
}

