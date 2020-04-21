import {Sort} from "./sort";
import {Order} from "./order";

export class Page {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  order: Order;
}
