import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Item} from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private itemSource = new BehaviorSubject(Item.ALL);
  public currentItem = this.itemSource.asObservable();

  constructor() { }

  public changeItem(item: Item) {
    this.itemSource.next(item);
  }
}
