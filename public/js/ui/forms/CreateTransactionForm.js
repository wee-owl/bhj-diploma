/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const selectForm = document.querySelectorAll('.accounts-select');
    if (User.current()) {
      Account.list(User.current(), (err, response) => {
        if (response && response.success) {
          [...selectForm].forEach(select => {
            select.innerHTML = '';
            response.data.forEach(data => {
              const option = document.createElement('option');
              option.value = `${data.id}`;
              option.textContent = `${data.name}`;
              select.append(option);
            });
          });
        } else {
          console.log('Ошибка при получении списка счетов', response.error);
        }
      });
    }
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    Transaction.create(data, (err, response) => {
      if (response && response.success) {
        App.update();
        this.element.reset();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
      } else {
        console.log('Ошибка регистрации', response.error);
      }
    });
  }
}