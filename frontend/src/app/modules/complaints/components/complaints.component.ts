import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ComplaintService} from "../../../services/complaint.service";
import {Complaint} from "../../../models/complaint";
import {switchMap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  // @Input() public postId: number;
  private postId: number;
  public postComplaints: Complaint[] = [];

  constructor(private complaintService: ComplaintService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getRouteParam();
  }

  public getRouteParam(): void {
    this.subscriptions.push(this.route.paramMap.pipe(
      switchMap(params =>
        params.getAll('id'))).subscribe(data => {
      this.postId = +data;
      this.getComplaintsByPostId();
    }));
  }

  private getComplaintsByPostId(): void {
    this.subscriptions.push(this.complaintService.getComplaintsByPostId(this.postId)
      .subscribe(complaints => {
        console.log(complaints);
      this.postComplaints = complaints;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
