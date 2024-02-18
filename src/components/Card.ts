import { ICard, ICardActions } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/Component';

export class Card extends Component<ICard> {
	protected _title: HTMLElement;
	protected _image: HTMLImageElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _description: HTMLElement;
	protected _buttonText: string;
	protected _button: HTMLButtonElement;

	constructor(
		protected blockName: string,
		container: HTMLElement,
		actions?: ICardActions
	) {
		super(container);

		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = container.querySelector(`.${blockName}__image`);
		this._category = container.querySelector(`.${blockName}__category`);
		this._price = container.querySelector(`.${blockName}__price`);
		this._description = container.querySelector(`.${blockName}__text`);
		this._buttonText = this._buttonText;
		this._button = container.querySelector(`.${blockName}__button`);

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set image(value: string) {
		this.setImage(this._image, value, this.title);
	}

	set category(value: string) {
		this.setText(this._category, value);
	}

	set price(value: number | null) {
		if (value !== null) {
			this.setText(this._price, `${value} синапсов`);
		} else {
			this.setText(this._price, 'Бесценно');
			if (this._button) {
				this._button.disabled = true;
			}
		}
	}

	set buttonText(status: string) {
		if (status === 'basket') {
			this.setText(this._button, 'Удалить');
		} else {
			this.setText(this._button, 'В корзину');
		}
	}

	set description(value: string) {
		this.setText(this._description, value);
	}
}

export class CatalogItem extends Card {
	protected _amount: HTMLElement;
	protected _title: HTMLElement;
	index: HTMLElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super('card', container, actions);
		this._amount = ensureElement<HTMLElement>('.card__price', container);
		this._title = ensureElement<HTMLElement>('.card__title', container);
		this.index = container.querySelector('.basket__item-index');
	}
}
