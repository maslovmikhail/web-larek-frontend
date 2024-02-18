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

## Интерфейс IPage.

Описывает действия на главной странице.

```
interface IPage {
	catalog: HTMLElement[];
	locked: boolean;
}

```

## Интерфейс IProductItem.

Описывает детальную информацию о товаре.

```
interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

```

## Интерфейс ICardActions.

Описывает действия выполняемые с карточкой товара.

```
interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

```

## Интерфейс ICard.

Описывает карточку товара.

```
interface ICard {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	buttonText: string;
	itemCount: number | null;
}

```

## Интерфейс IModalData.

Описывает содержание модального окна.

```
export interface IModalData {
	content: HTMLElement;
}

```

## Интерфейс IBasketView.

Описывает содержимое корзины.

```
interface IBasketView {
	items: HTMLElement[];
	total: number | string;
	selected: string[];
}

```

## Интерфейс IFormState.

Описывает состояние полей формы

```
interface IFormState {
	valid: boolean;
	errors: string[];
}

```

## Интерфейс IOrderForm.

Описывает адрес доставки.

```
interface IOrderForm {
  payment: string;
  address: string;
}

```

## Интерфейс IOrder расширяет интерфейс IOrderForm.

```

interface IOrder extends IOrderForm {
	items: IProductItem[];
}

```

## Интерфейс IContactsForm.

Описывает контакты покупателя.

```
interface IContactsForm {
	email: string;
	phone: string;
}

```

## Интерфейс IContacts расширяет интерфейс IContactsForm.

```
interface IContacts extends IContactsForm {
	items: string[];
}

```

## Интерфейс ISuccess.

Описывает завершение заказа.

```
interface ISuccess {
  id: string;
  total: number;
}

```

# Базовый код

## Класс Model<T>

Абстрактный базовый класс, для управления данными и их взаимодействия с системой событий.

- isModel - функция для проверки на модель.

Содержит метод:

- emitChanges(event: string, payload?: object) - cообщить всем что модель поменялась.

## Класс Component<T>

Абстрактный базовый класс, предоставляет инструментарий для работы с DOM в дочерних компонентах. Содержит методы:

- toggleClass(element: HTMLElement, className: string, force?: boolean) - переключить класс.
- setText(element: HTMLElement, value: unknown) - установить текстовое содержимое.
- setDisabled(element: HTMLElement, state: boolean) - сменить статус блокировки.
- setHidden(element: HTMLElement) - скрыть элемент.
- setVisible(element: HTMLElement) - показать элемент.
- setImage(element: HTMLImageElement, src: string, alt?: string) - установить изображение с алтернативным текстом.
- render(data?: Partial<T>): HTMLElement - вернуть корневой DOM-элемент.

## Класс EventEmitter

Базовый класс, центральный брокер событий. Позволяет компонентам подписываться на события и реагировать на них. Содержит методы:

- on<T extends object>(eventName: EventName, callback: (event: T) => void) - установить обработчик на событие.
- off(eventName: EventName, callback: Subscriber) - снять обработчик с события.
- emit<T extends object>(eventName: string, data?: T) - инициировать событие с данными.
- onAll(callback: (event: EmitterEvent) => void) - слушать все события.
- offAll() - сбросить все обработчики.
- trigger<T extends object>(eventName: string, context?: Partial<T>) - сделать коллбек триггер, генерирующий событие при вызове.

## Класс Api

Базовый класс - клиент для взаимодействия с внешними API и сервером. Содержит методы:

- handleResponse(response: Response): Promise<object> - обработчик ответа с сервера.
- get(uri: string) - получить ответ с сервера.
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - отправить данные на сервер.


# View - компоненты представления

## Класс Card

Класс для создания карточки товара. Наследует класс Component. Содержит сеттеры и геттеры:

- set id(value: string) - установить id товара.
- set title(value: string) - установить название товара.
- set image(value: string) - установить url изображения товара.
- set category(value: string) - установить категорию товара.
- set price(value: number | null) - установить цену товара.
- set buttonText(status: string) - установить текст кнопки в карточке товара.
- set description(value: string) - установить описание товара.
- get id(): string - получить id товара.
- get title(): string - получить название товара.

## Класс CatalogItem

Класс отображения отдельной карточки товара в каталоге на главной странице, в модальном окне и в списке корзины. Наследует класс Card.

## Класс Form<T>

Класс для управления формами. Наследует класс Component. Содержит методы:

- onInputChange(field: keyof T, value: string) - вызывается при изменении значений полей формы.

- render(state: Partial<T> & IFormState) - возвращает форму с новым состоянием.

Сеттеры:

- set valid(value: boolean) - установить валидацию полей.
- set errors(value: string) - установить вывод информации об ошибках.

## Класс Order

Класс предназначен для выбора способа оплаты и ввода адреса доставки. Наследует класс Form. Содержит метод:

- selectPaymentMethod(name: HTMLElement) - выбрать способ оплаты.

Сеттер:

- set address(value: string) - адрес доставки.

## Класс Contacts

Класс предназначен для управления формой контактных данных пользователя. Наследует класс Form. Содержит сеттеры:

- set phone(value: string) - телефон пользователя
- set email(value: string) - эл. почта пользователя.

## Класс Page

Класс управления элементами интерфейса главной страницы. Наследует базовый класс Component. Содержит сеттеры:

- set counter(value: number | null) - обновить счётчик количества товаров в корзине.
- set catalog(items: HTMLElement[]) - вывести каталог товаров.
- set locked(value: boolean) - установить или снять блокировку прокрутки страницы.

## Класс Basket

Класс управляет отображением корзины. Наследует класс Component. Содержит сеттеры:

- set items(items: HTMLElement[]) - вставить данные в корзину.
- set selected(items: ProductItem[]) - установить наличие товаров в корзине.
- set total(total: number | string) - установить общую сумму товаров в корзине.

## Класс Modal

Класс управления поведением модальных окон. Наследует класс Component. Содержит сеттер:

- set content(value: HTMLElement) - установить содержимое модального окна.

Методы:

- open() - открыть окно.
- close() - закрыть окно.
- render(data: IModalData): HTMLElement - вывести данные.

## Класс Success

Класс отображения успешного завершения процесса оплаты.

- set id() - id заказа.
- set total(total: number | string) - отобразить общую сумму товаров.

# Model - компоненты данных

## Класс ProductItem

Наследует класс Model. Реализует экземпляр товара.

```

class ProductItem extends Model<IProductItem> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	status: ProductStatus = 'sell';
	itemCount: number = 0;
}

```

## Класс AppState

Центральный класс для управления данными и событиями. Наследует класс ProductItem. Содержит методы:

- clearBasket() - очистить корзину.
- getTotal() - получить общую сумму заказа.
- setCatalog(items: IProductItem[]) - установить список товаров.
- setPreview(item: IProductItem) - установить детальную информацию о товаре.
- setOrderField(field: keyof IOrderForm, value: string) - отслеживать изменения полей заказа.
- validateOrder() - валидация полей заказа.
- setContactsField(field: keyof IContactsForm, value: string) - отслеживать изменения полей контактной информации.
- validateContacts() - валидация полей контактной информации.
- toggleBasketList(item: ProductItem) - удалить или добавить товар в список корзины.
- getBasketList(): ProductItem[] - получить список корзины.

## Класс WebLarekAPI.

Класс для связи и получения информации с сервера. Наследует базовый класс Api.

Содержит метод:

- getProductList(): Promise<IProductItem[]> - получить список товаров с сервера.

# Presenter

Код описывающий взаимодействие отображения и данных между собой находится в файле src/index.ts.
