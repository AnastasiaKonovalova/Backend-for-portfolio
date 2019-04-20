# Панель администратора для сайта-портфолио

## Технологии

Проект написан на Node.js с использованием Express и базой данных MongoDB. Сервер отдает статику и рендерит небольшие Pug-шаблоны динамических частей.

## Старт проекта

В данном репозитории уже есть вся статика для фронтенд части приложения. Сервер не требует локальной установки MongoDB - база данных размещена в облачном хранилище.

По умолчанию портфолио доступно по адресу http://localhost:3000/
Панель администратора http://localhost:3000/admin/

Для доступа в панель администратора необходимо авторизоваться на первой странице сайта-портфолио. Логин: admin, пароль: 12345.

### Склонируйте репозиторий и перейдите в папку проекта

git clone https://github.com/AnastasiaKonovalova/Backend-for-portfolio

### Установите модули локально

npm install | yarn install

### Запустите сборку проекта

npm start | yarn start

### Отправка письма

Если вы хотите протестировать функционал отправки писем, то вам необходимо заполнить своими данными поля user и pass в файле config/config.json
