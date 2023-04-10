/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * Метод запускает функцию createRequest
   * Метод посылает GET запрос на адрес, заданный URL.
   * 
   * */
  static get(id = '', callback) {
    createRequest({
      url: `${this.URL}/${id}`,
      method: 'GET',
      callback
    });
  }
}

Account.URL = '/account';