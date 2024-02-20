import { IOrder, IProductItem, ISuccess } from '../types';
import { Api, ApiListResponse } from './base/api';

export interface IWebLarekAPI {
	getProductList: () => Promise<IProductItem[]>;
	orderResult: (order: IOrder) => Promise<ISuccess>;
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

	orderResult(order: IOrder): Promise<ISuccess> {
		return this.post(`/order`, order).then((data: ISuccess) => data);
	}
}
