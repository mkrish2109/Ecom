const baseURL = "http://localhost:5000";

async function fetchHelper(url, method = "GET", body) {
  const options = {};

  if (body) {
    options.body = JSON.stringify(body);
  }

  if (method === "POST" || method === "PATCH" || method === "PUT") {
    options.headers = {
      "Content-Type": "application/json",
    };
  }

  const response = await fetch(url, {
    method,
    credentials: "include",
    ...options,
  });

  const data = await response.json();

  return data;
}

export { fetchHelper, baseURL };
