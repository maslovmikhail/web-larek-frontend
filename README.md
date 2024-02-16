# Проектная работа "Веб-ларек"

https://github.com/maslovmikhail/web-larek-frontend

Стек: HTML, SCSS, TS, Webpack

Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build
```

# Основные типы данных

## Интерфейс IProductItem

Описывает детальную информацию о товаре.

## Интерфейс IBasketView

Описывает содержимое корзины.

## Интерфейс IOrderForm

Описывает адрес доставки.

## Интерфейс IContactsForm

Описывает контакты покупателя.

## Интерфейс ISuccess

Описывает завершение заказа.

# Базовый код

## Абстрактный класс Model

Базовая модель, чтобы можно было отличить ее от простых объектов с данными. Содержит метод:

- emitChanges() - cообщить всем что модель поменялась.

## Абстрактный класс Component<T>

Базовый компонент. Содержит методы:

- toggleClass() - переключить класс.
- setDisabled() - сменить статус блокировки.
- setHidden() - скрыть.
- setVisible() - показать.
- setImage() - установить изображение с алтернативным текстом.
- render() - вернуть корневой DOM-элемент.

## Класс EventEmitter

Брокер событий. Содержит методы:

- on() - установить обработчик на событие.
- off() - снять обработчик с события.
- emit() - инициировать событие с данными.
- onAll() - слушать все события.
- offAll() - сбросить все обработчики.
- trigger() - сделать коллбек триггер, генерирующий событие при вызове

## Класс Api

Класс - клиент API для взаимодействия с сервером. Содержит методы:

- handleResponse() - обработчик ответа с сервера.
- get() - получить ответ с сервера.
- post() - отправить данные на сервер.

# View - компоненты представления

## Класс Card

Класс отображения карточки товара.

- set id() - установить id товара.
- set title() - установить название товара.
- set image() - установить url изображения товара.
- set category() - установить категорию товара.
- set price() - установить цену товара.
- set buttonText() - установить текст кнопки в карточке товара.
- set description() - установить описание товара.

- get id() - получить id товара.
- get title() - получить название товара.

## Класс CatalogItem

Класс отображения карточки товара в каталоге на главной странице.

## Класс PreviewItem

Класс отображения карточки товара в модальном окне.

## Класс BasketItem

Класс отображения отдельного товара в корзине.

## Класс Form

Класс отображения формы

- set valid() - установить валидацию полей.
- set errors() - установить вывод информации об ошибках.

## Класс Order

Класс отображения формы заказа.

- set payment() - способ оплаты.
- set address() - адрес покупателя.

## Класс Contacts

Класс отображения формы контактов.

- set phone() - телефон покупателя
- set email() - эл. почта покупателя.

## Класс Page

Класс отображения главной страницы.

- set counter() - счётчик количества товаров в корзине.
- set catalog() - установить каталог товаров.
- set locked() - установить или снять блокировку прокрутки страницы.

## Класс Basket

Класс отображения корзины.

- set items() - вставить данные в корзину.
- set selected() - установить наличие товаров в корзине
- set total() - установить общую сумму.

## Класс Modal

Класс отображения модального окна.

- open() - открыть окно.
- close() - закрыть окно.
- render() - вывести данные.

## Класс Success

Класс отображения завершения процесса оплаты.

- set id () - id заказа.
- set total() - отобразить общую сумму товаров.

# Model - компоненты данных

## Класс ProductItem

Реализует экземпляр товара.

## Класс AppState

Реализует методы для работы с данными:

- clearBasket() - очистить корзину.
- getTotal() - получить общую сумму заказа.
- setCatalog() - кполучить список товаров.
- setPreview() - получить детальную информацию о товаре.
- setOrderField() - отслеживать изменения полей заказа.
- validateOrder() - валидация полей заказа.
- setContactsField() - отслеживать изменения полей контактной информации.
- validateContacts() - валидация полей контактной информации.
- addBasketList() - добавить товар в список корзины.
- getBasketList() - получить список товаров в корзине.
- removeItem() удалить товар из корзины.

## Класс WebLarekAPI

Класс для связи и получения информации с сервера.

Содержит методы:

- getProductItem() - получить детальную информацию о товаре с сервера.
- getProductList() - получить список товаров с сервера.

# Presenter

Код описывающий взаимодействие отображения и данных между собой находится в файле src/index.ts.
