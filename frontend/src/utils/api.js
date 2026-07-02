// Wraps the native fetch() so every admin API call automatically carries
// the JWT we got from /api/auth/login. If the server says the token is
// missing/expired (401), we clear it and kick the user back to login.
export function authFetch(url, options = {}) {
  const token = localStorage.getItem('deurali_admin_token');

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  return fetch(url, { ...options, headers }).then((res) => {
    if (res.status === 401) {
      localStorage.removeItem('deurali_admin_token');
      // Force a reload back to the public site; App.jsx will see there's
      // no token and show the login screen next time Admin is opened.
      window.location.reload();
    }
    return res;
  });
}

export function saveAdminToken(token) {
  localStorage.setItem('deurali_admin_token', token);
}

export function getAdminToken() {
  return localStorage.getItem('deurali_admin_token');
}

export function clearAdminToken() {
  localStorage.removeItem('deurali_admin_token');
}
