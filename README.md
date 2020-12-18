# express-mesto
# Проектная работа 15: "Mesto" фронтенд и бэкенд

### Обзор

1. В проектой работе используются: *HTML* + *CSS*: вёрстка страницы + *JSX* + *React*.
Страница адаптированна под разные размеры экранов.
2. Реализованно открытие popup-окна для добавления в галлерею новой картинки с названием
3. Реализованно открытие popup-окна для редактирования информации о пользователе
4. Открытие popup с картинкой
5. Все popup-окна плавно открываются и закрываются
6. В проект добавлены компоненты: App, Card, Main, Header, Footer, PopupWithForm, EditAvatarPopup, EditProfilePopup, AddPlacePopup, I magePopup, api
7. Реализован API для отправки запросов к серверу: получение карточек, информация о пользователе, установка лайка/дизлайка карточке,
добавление/удаление карточки, обновление информации пользователя, изменение аватара
8. Создан сервер на express 
9. Настроены мартшруты для отдачи данных от сервера: 
  - GET '/users' запросить всех пользователей
  - GET '/users/:id' запросить пользователя по id
  - POST '/users' создать пользователя
  - PATCH '/users/me' обновить данные пользователя
  - PATCH '/users/me/avatar' обновить аватар пользователя
  - GET '/cards' запросить все карточки
  - POST '/cards' создать карточку
  - DELETE '/cards/:cardId' удалть карточку
  - PUT '/cards/:cardId/likes' поставить лайк карточке
  - DELETE '/cards/:cardId/likes' удалить лайк у карточки



**gh-pages**

* Проекта на GitHub Pages - https://TIsaicheva.github.io/mesto-react
(https://tisaicheva.github.io/mesto/index.html)

**Figma**

* [Ссылка на макет в Figma](https://www.figma.com/file/StZjf8HnoeLdiXS7dYrLAh/JavaScript.-Sprint-4)


**Используемые технологии**

1. HTML
2. CSS: flex, grid, transform, transition
3. JSX
4. Деструктуризация
5. Export/Import
6. React
7. API
8. Поднятие стейта, референсы, управляемые компоненты
9. Express
