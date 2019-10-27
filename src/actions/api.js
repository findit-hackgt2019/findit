const itemsUrl = 'https://findithackgt.azurewebsites.net/api/getItems';
export async function getAllItems() {
  return fetch(itemsUrl, {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((res) => res.json());
}

const searchUrl = 'https://findithackgt.azurewebsites.net/api/search';
export async function searchItems(name) {
  return fetch(`${searchUrl}?name=${name}`, {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((res) => res.json());
}
