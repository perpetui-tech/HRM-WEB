const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/employee/v1/Auth';


export async function callFetchApi(endpoint, method, data = null, token = "") {
  console.log(endpoint, method, data = null, token )
  const baseUrl = BASE_URL;
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const config = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  };
  console.log('${baseUrl}${endpoint}', baseUrl+endpoint, config)
  const res = await fetch(`${baseUrl}${endpoint}`, config);

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}