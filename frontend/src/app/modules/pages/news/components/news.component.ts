import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  selectedItem: string;

  constructor() {}

  ngOnInit(): void {
  }

  onSelect(item: string) {
    this.selectedItem = item;
  }

}