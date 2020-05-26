import {Component, Input, OnInit} from '@angular/core';
import {Reaction} from "../../../../models/reaction";

@Component({
  selector: 'app-reaction-view-card',
  templateUrl: './reaction-view-card.component.html',
  styleUrls: ['./reaction-view-card.component.css']
})
export class ReactionViewCardComponent implements OnInit {

  @Input() public reaction: Reaction;

  constructor() {}

  ngOnInit(): void {

  }

}
