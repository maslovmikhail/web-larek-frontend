import './scss/styles.scss';

import { Page } from './components/Page';
import { cloneTemplate, ensureElement } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { AppState, ProductItem } from './components/AppData';
import { CatalogItem } from './components/Card';
import { WebLarekAPI } from './components/WebLarekAPI';
import { API_URL, CDN_URL, PaymentMethods } from './utils/constants';
import { IContactsForm, IOrderForm } from './types';
import { Modal } from './components/common/Modal';
import { Basket } from './components/common/Basket';
import { Order } from './components/Order';
import { Contacts } from './components/Contacts';
import { Success } from './components/common/Success';

const events = new EventEmitter();
const api = new WebLarekAPI(CDN_URL, API_URL);

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasket = ensureElement<HTMLTemplateElement>('#card-basket');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events, {
	onClick: (evt: Event) => events.emit('payment:toggle', evt.target),
});
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);

// Вывод каталога товаров на главную страницу
events.on('catalog:install', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			category: item.category,
			price: item.price,
		});
	});
});

// Открыть карточку товара
events.on('card:select', (item: ProductItem) => {
	const card = new CatalogItem(cloneTemplate(cardPreviewTemplate), {
		// Удалить или добавить товар в корзину
		onClick: () => {
			events.emit('item:toggle', item);
			page.counter = appData.getBasketList().length;
			card.buttonText = item.status;
		},
	});
	return modal.render({
		content: card.render({
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
			category: item.category,
			buttonText: item.status,
		}),
	});
});

// Блокируем прокрутку страницы если открыта модалка
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// Открытие корзины
events.on('basket:open', () => {
	basket.items = appData.getBasketList().map((item) => {
		const card = new CatalogItem(cloneTemplate(cardBasket), {
			onClick: () => {
				events.emit('item:toggle', item);
			},
		});
		card.index.textContent = item.itemCount.toString();
		return card.render({
			title: item.title,
			price: item.price,
			itemCount: item.itemCount,
		});
	});
	page.counter = appData.getBasketList().length;
	basket.selected = appData.getBasketList();
	basket.total = appData.getTotal();
	return modal.render({
		content: basket.render(),
	});
});

// Удаление из корзины
let isRemovingItem = false;
events.on('item:toggle', (item: ProductItem) => {
	if (!isRemovingItem) {
		isRemovingItem = true;
		appData.toggleBasketList(item);
		basket.items = appData.getBasketList().map((item) => {
			const card = new CatalogItem(cloneTemplate(cardBasket));
			card.index.textContent = item.itemCount.toString();
			return card.render({
				title: item.title,
				price: item.price,
				itemCount: item.itemCount,
			});
		});
		page.counter = appData.getBasketList().length;
		basket.selected = appData.getBasketList();
		basket.total = appData.getTotal();
		isRemovingItem = false;
	}
});

// Форма заказа
events.on('order:open', () => {
	modal.render({
		content: order.render({
			address: '',
			valid: false,
			errors: [],
			// payment: 'online'
		}),
	});
});

// Смена способа оплаты
events.on('payment:toggle', (name: HTMLElement) => {
	if (!name.classList.contains('button_alt-active')) {
		order.selectPaymentMethod(name);
		appData.order.payment = PaymentMethods[name.getAttribute('name')];
	}
});

// Изменилось одно из полей формы заказа
events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

// Изменилось состояние валидации формы заказа
events.on('formErrorsOrder:change', (errors: Partial<IOrderForm>) => {
	const { address } = errors;
	order.valid = !address;
	order.errors = Object.values({ address }).filter(Boolean).join('; ');
});

// Форма контактов
events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			email: '',
			phone: '',
			valid: false,
			errors: [],
		}),
	});
});

// Изменилось одно из полей формы контактов
events.on(
	/^contacts\.[^:]*:change/,
	(data: { field: keyof IContactsForm; value: string }) => {
		appData.setContactsField(data.field, data.value);
	}
);

// Изменилось состояние валидации формы контактов
events.on('formErrorsContacts:change', (errors: Partial<IContactsForm>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ email, phone }).filter(Boolean).join('; ');
});

// Окно завершения оплаты
events.on('contacts:submit', () => {
	const success = new Success(cloneTemplate(successTemplate), {
		onClick: () => {
			modal.close();
			appData.clearBasket();
			basket.items = [];
			page.counter = appData.getBasketList().length;
		},
	});
	modal.render({
		content: success.render({}),
	});
	success.total = `Списано ${appData.getTotal()}`;
});

// Получаем каталог товаров с сервера
api
	.getProductList()
	.then(appData.setCatalog.bind(appData))
	.catch((err) => {
		console.error(err);
	});
