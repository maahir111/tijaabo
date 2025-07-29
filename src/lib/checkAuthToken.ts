export function isTokenExpired(token?: string): boolean {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000;
    return Date.now() > expiry;
  } catch (e) {
    return true;
  }
}