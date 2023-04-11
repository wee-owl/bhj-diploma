/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar {
  /**
   * Запускает initAuthLinks и initToggleButton
   * */
  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const sidebarBtn = document.querySelector('.sidebar-toggle');
    sidebarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('body').classList.toggle('sidebar-open');
      document.querySelector('body').classList.toggle('sidebar-collapse');
    });
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регистрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const loginBtn = document.querySelector('.menu-item_login');
    const registerBtn = document.querySelector('.menu-item_register');
    const logoutBtn = document.querySelector('.menu-item_logout');

    loginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('login').open();
    });

    registerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      App.getModal('register').open();
    });

    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      User.logout(response => {
        if (response && response.success) App.setState('init')
      });
    });
  }
}