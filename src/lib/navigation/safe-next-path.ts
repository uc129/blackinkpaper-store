export function getSafeNextPath(
  nextPath: string | null,
  fallbackPath = "/store",
) {
  return nextPath?.startsWith("/") && !nextPath.startsWith("//")
    ? nextPath
    : fallbackPath;
}
