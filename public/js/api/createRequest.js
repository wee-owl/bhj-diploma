/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = ({url, data = {}, method, callback}) => {
  const xhr = new XMLHttpRequest();
  const formData = new FormData();
  xhr.responseType = 'json';
  let sendURL = url;

  if (method == 'GET') {
    sendURL = `${url}?`;
    for (let [key, value] in Object.entries(data)) {
      sendURL += `${key}=${value}&`;
    }
    sendURL.slice(0, -1);
  } else {
    for (let [key, value] in Object.entries(data)) {
      formData.append(key, value);
    }
  }

  try {
    xhr.open(method, sendURL);
    xhr.send(formData);
  }
  catch (err) {
    callback(err);
  }

  xhr.onload = () => {
    if (xhr.status != 200) {
      callback(err);
      console.log(xhr.status, xhr.responseText);
    } else {
      callback(xhr.response);
    }
  }
};