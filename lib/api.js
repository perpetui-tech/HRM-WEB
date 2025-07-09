const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/employee/v1/Auth';


export async function callApi(endpoint, method = "GET", data = null, token = "") {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  };

  const res = await fetch(`${baseUrl}${endpoint}`, config);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json(); // your Laravel response
}