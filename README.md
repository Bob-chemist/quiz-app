# Приложение онлайн-тестов Quiz-app

## [Quiz-app](https://react-quiz-14e28.firebaseapp.com/ 'Quiz-app')

### Использованы

- Навигация - React Router (BrowserRouter, Route, Switch, NavLink, Redirect);
- БД - NoSQL на Firebase, получение данных в json формате;
- Локальный store (Redux): список тестов, хранение нового теста до отправки на сервер, информация об аутентификации;
- Redux: applyMiddleware, compose, combineReducers;
- Запрос и отправка данных в БД - axios;
- Проверка валидности заполнения полей логина и пароля в форме авторизации/регистрации;
- Redux-Thunk;

### Реализовано

- Главная страница со списком тестов;
- Страница прохождения тестов и показа результата;
- Меню;
- Форма добавления нового теста, с дальнейшей отправкой на сервер. Доступно только зарегистрированным пользователям;
- Страница авторизации/регистрации с редиректом на главную страницу при успешной авторизации;

### ToDo

- Список результатов у зарегистрированного пользователя;
- Переписать некоторые классовые компоненты на хуки;
- Добавить ErrorBoundary
