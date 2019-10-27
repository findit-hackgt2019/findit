const allOrdersUrl = 'https://findithackgt.azurewebsites.net/api/getAllOrders';
export async function getAllItems() {
  return fetch(allOrdersUrl, {
    method: 'get',
    headers: {
      'Accept': 'application/json'
    }
  })
    .then((res) => res.json());
}

const getOrderUrl = 'https://findithackgt.azurewebsites.net/api/getOrder';
export async function getOrder(id) {
  return fetch(getOrderUrl, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id
    })
  })
    .then((res) => res.json());
}

const addOrderUrl = 'https://findithackgt.azurewebsites.net/api/addOrder';
export async function addOrder(order) {
  return fetch(addOrderUrl, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      order
    })
  })
    .then((res) => res.json());
}

const editOrderUrl = 'https://findithackgt.azurewebsites.net/api/editOrder';
export async function editOrder(id, newOrder) {
  return fetch(editOrderUrl, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id,
      newOrder
    })
  })
    .then((res) => res.json());
}

const deleteOrderUrl = 'https://findithackgt.azurewebsites.net/api/deleteOrder';
export async function deleteOrder(id) {
  return fetch(deleteOrderUrl, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id
    })
  })
    .then((res) => res.json());
}
