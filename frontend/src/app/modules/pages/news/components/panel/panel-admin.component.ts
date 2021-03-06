import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {DataService} from "../../../../../services/data.service";
import {Subscription} from "rxjs";
import {Item} from "../../../../../models/enums/item";

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit, OnDestroy {

  // public username: string;
  private subscriptions: Subscription[] = [];
  private selectedItem: Item;
  Item = Item;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.subscriptions.push(this.data.currentItem.subscribe(item => this.selectedItem = item));
  }

  newItem(item: Item) {
    this.data.changeItem(item);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
