export function getAuthToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const localToken = localStorage.getItem("auth_token");
  if (localToken) {
    return localToken;
  }

  const cookies = document.cookie.split("; ");
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("token="));
  return tokenCookie ? decodeURIComponent(tokenCookie.split("=")[1]) : null;
}

export function getAuthHeaders(token?: string): Record<string, string> {
  const authToken = token || getAuthToken();
  return authToken ? { Authorization: `Bearer ${authToken}` } : {};
}
