import {Sort} from "./sort";
import {Order} from "./order";

export class Page<T> {
  content: T[] = [];
  totalPages: number = 0;
  pageNumber: number = 0;
  pageSize: number = 2;
  sort: Sort = Sort.DATE;
  order: Order = Order.ASC;
}
