import { IProductItem } from '../types';
import { Api, ApiListResponse } from './base/api';

export interface IWebLarekAPI {
	getProductList: () => Promise<IProductItem[]>;
	getProductItem: () => Promise<IProductItem>;
}

export class WebLarekAPI extends Api {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string) {
		super(baseUrl);
		this.cdn = cdn;
	}

	getProductList(): Promise<IProductItem[]> {
		return this.get(`/product`).then((data: ApiListResponse<IProductItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}
}
