import { readRelativeFile } from "./readRelativeFile.js";

interface PackageInfo {
  version: string;
  updatedAt: string;
}

let packageCache: PackageInfo | undefined = undefined;

/**
 * Get the package data version
 *
 * @returns the package data version
 */
async function getPackageData(): Promise<PackageInfo> {
  if(!packageCache) {
    const packageInfo = await readRelativeFile<typeof packageCache>(['package.json']);
    packageCache = packageInfo;
  }
  return packageCache!;
}

/**
 * Get the version of the package
 */
export async function iamDataVersion(): Promise<string> {
  const data = await getPackageData();
  return data.version;
}

/**
 * Get the date the data was last updated
 *
 * @returns the date the data was last updated
 */
export async function iamDataUpdatedAt(): Promise<Date> {
  const data = await getPackageData();
  return new Date(data.updatedAt);
}