// Карточка товара
export interface IProductItem {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number;
}

// Отображение корзины
export interface IBasketView {
	items: HTMLElement[];
	total: number;
	selected: string[];
}

// Адрес доставки
export interface IOrderForm {
  address: string;
}

// Контакты покупателя
export interface IContactsForm {
  email: string;
  phone: string;
}

// Оформление заказа
export interface ISuccess {
  total: number;
}