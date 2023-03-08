const url = 'http://localhost:3000/api';

async function api(endpoint, options) {
  const response = await fetch(`${url}${endpoint}`, options);
  return await response.json();
}

async function api_post(endpoint, payload) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  return await api(endpoint, options);
}

async function api_delete(endpoint) {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await api(endpoint, options);
}

async function api_get(endpoint) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  return await api(endpoint, options);
}
export { api_get, api_post, api_delete };
