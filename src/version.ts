import { readFileSync } from "fs";
import { join } from "path";


let versionCache: string | undefined = undefined;

/**
 * Get the version of the package
 */
export function getVersion(): string {
  if(!versionCache) {
    let fileRoot = join(__dirname, '..', '..');
    if(__dirname.endsWith('src')) {
      fileRoot = join(__dirname, '..');
    }

    const data = readFileSync(join(fileRoot, 'package.json'), 'utf8');
    const packageInfo = JSON.parse(data);
    versionCache = packageInfo.version;
  }

  return versionCache!
}

