import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {Page} from "../../../models/page";
import {Post} from "../../../models/post";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {createHasError, HasErrorFunction} from "../../../util/has-error";
import {validation} from "../../../util/validation";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.css']
})
export class PagingComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  public selectedPage: number = null;
  public pageForm: FormGroup;
  public hasError: HasErrorFunction;

  @Input() public page: Page<Post>;
  @Output() onChanged: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.pageForm = new FormGroup({
      page: new FormControl('', validation.digitsValid)
    });
    this.hasError = createHasError(this.pageForm);
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

  private goOver(selectedPage: number): void {
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

  public valid(selectedPage: number): void {
    if(selectedPage !== null && selectedPage !== undefined) {
      console.log(selectedPage);
      this.goOver(selectedPage);
    } else {
      this._snackBar.open('Empty value', '', {duration: 3000});
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
