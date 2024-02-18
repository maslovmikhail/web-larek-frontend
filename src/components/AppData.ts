import {
	IContacts,
	IContactsForm,
	IOrder,
	IOrderForm,
	IProductItem,
} from '../types';
import { Model } from './base/Models';

export type ProductStatus = 'basket' | 'sell';

export type FormErrorsOrder = Partial<Record<keyof IOrder, string>>;
export type FormErrorsContacts = Partial<Record<keyof IContacts, string>>;

export class ProductItem extends Model<IProductItem> {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
	status: ProductStatus = 'sell';
	itemCount: number = 0;
}

export class AppState extends ProductItem {
	basketList: ProductItem[] = [];
	catalog: ProductItem[];
	order: IOrder = {
		address: '',
		items: [],
		payment: '',
	};
	contacts: IContacts = {
		email: '',
		phone: '',
		items: [],
	};
	preview: string | null;
	formErrorsOrder: FormErrorsOrder = {};
	formErrorsContacts: FormErrorsContacts = {};

	clearBasket() {
		this.basketList.forEach((item) => {
			item.status = 'sell';
		});
		this.basketList = [];
	}

	getTotal() {
		return this.basketList.reduce((a, c) => a + c.price, 0) + ' синапсов';
	}

	setCatalog(items: IProductItem[]) {
		this.catalog = items.map((item) => new ProductItem(item, this.events));
		this.emitChanges('catalog:install', { catalog: this.catalog });
	}

	setPreview(item: IProductItem) {
		this.preview = item.id;
		this.emitChanges('card:select', item);
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateOrder()) {
			this.events.emit('order:ready', this.order);
		}
	}

	validateOrder() {
		const errors: typeof this.formErrorsOrder = {};

		if (!this.order.address) {
			errors.address = 'Необходимо указать адрес';
		}
		this.formErrorsOrder = errors;
		this.events.emit('formErrorsOrder:change', this.formErrorsOrder);

		return Object.keys(errors).length === 0;
	}

	setContactsField(field: keyof IContactsForm, value: string) {
		this.contacts[field] = value;
		if (this.validateContacts()) {
			this.events.emit('contacts:ready', this.contacts);
		}
	}

	validateContacts() {
		const errors: typeof this.formErrorsContacts = {};

		if (!this.contacts.email) {
			errors.email = 'Необходимо указать email';
		}
		if (!this.contacts.phone) {
			errors.phone = 'Необходимо указать телефон';
		}
		this.formErrorsContacts = errors;
		this.events.emit('formErrorsContacts:change', this.formErrorsContacts);

		return Object.keys(errors).length === 0;
	}

	toggleBasketList(item: ProductItem) {
		if (item.status === 'sell' && item.price !== null) {
			this.basketList.push(item);
			item.status = 'basket';
			item.itemCount = this.getBasketList().length;
		} else if (item.status === 'basket') {
			this.basketList = this.basketList.filter((it) => it !== item);
			item.status = 'sell';
			item.itemCount = this.getBasketList().length;
		}
	}

	getBasketList(): ProductItem[] {
		return this.basketList;
	}
}
