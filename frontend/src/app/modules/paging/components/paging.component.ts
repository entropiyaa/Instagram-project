import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {Page} from "../../../models/page";
import {Post} from "../../../models/post";

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public selectedPage: number;
  @Input() public page: Page<Post>;
  @Output() onChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
  }

  changePage() {
    this.onChanged.emit();
  }

  public next(): void {
    if(this.page.pageNumber < this.page.totalPages - 1) {
      this.page.pageNumber++;
      if(this.selectedPage) {
        this.selectedPage++;
      }
      this.changePage();
    }
  }

  public previous(): void {
    if(this.page.pageNumber > 0) {
      this.page.pageNumber--;
      if(this.selectedPage) {
        this.selectedPage--;
      }
      this.changePage();
    }
  }

  public goOver(selectedPage: number): void {
    if(selectedPage < 1) {
      this.page.pageNumber = 0;
    } else if(selectedPage > this.page.totalPages) {
      this.page.pageNumber = this.page.totalPages - 1;
    } else {
      this.page.pageNumber = selectedPage - 1;
    }
    this.selectedPage = this.page.pageNumber + 1;
    this.changePage();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
