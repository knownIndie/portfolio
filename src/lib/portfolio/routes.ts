export const v2Routes = ["/", "/about", "/projects", "/resume"] as const;

export type V2Route = (typeof v2Routes)[number];

export function toV1Route(pathname: string): string {
  if (pathname === "/") return "/v1";
  return `/v1${pathname}`;
}

export function toV2Route(pathname: string): string {
  if (pathname === "/v1") return "/";
  return pathname.startsWith("/v1/") ? pathname.slice(3) : pathname;
}
