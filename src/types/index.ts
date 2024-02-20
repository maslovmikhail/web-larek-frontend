// Управление главной страницой
export interface IPage {
	catalog: HTMLElement[];
	locked: boolean;
}

// Описание товара
export interface IProductItem {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

// Действия выполняемые с карточкой товара
export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

// Карточка товара
export interface ICard extends IProductItem {
	buttonText: string;
	itemCount: number | string;
}

// Содержание модального окна
export interface IModalData {
	content: HTMLElement;
}

// Отображение корзины
export interface IBasketView {
	items: HTMLElement[];
	total: number | string;
	selected: string[];
}

// Описывает состояние полей формы
export interface IFormState {
	valid: boolean;
	errors: string[];
}

// Адрес доставки
export interface IOrderForm {
	payment: string;
	address: string;
}

// Контакты покупателя
export interface IContactsForm {
	email: string;
	phone: string;
}

// Список товаров
export interface IOrder extends IOrderForm, IContactsForm {
	total: number | string;
	items: string[];
}

export interface IContacts extends IContactsForm {
	items: string[];
}

export interface IActions {
	onClick: (event: MouseEvent) => void;
}

export interface ISuccessActions {
	onClick: () => void;
}

// Оформление заказа
export interface ISuccess {
	id: string;
	total: number;
}

export type FormErrorsOrder = Partial<Record<keyof IOrder, string>>;
export type FormErrorsContacts = Partial<Record<keyof IContacts, string>>;
