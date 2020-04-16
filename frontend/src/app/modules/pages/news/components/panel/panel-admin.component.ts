import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-panel-admin',
  templateUrl: './panel-admin.component.html',
  styleUrls: ['./panel-admin.component.css']
})
export class PanelAdminComponent implements OnInit {

  public username: string;
  @Output() public selectedItem = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
  }

  onSelect(item: string) {
    this.selectedItem.emit(item);
  }
}
