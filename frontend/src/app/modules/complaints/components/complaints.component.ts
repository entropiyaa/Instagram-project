import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ComplaintService} from "../../../services/complaint.service";
import {Complaint} from "../../../models/complaint";

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  @Input() public postId: number;
  public postComplaints: Complaint[] = [];
  public visibility: boolean = false;

  constructor(private complaintService: ComplaintService) {}

  ngOnInit(): void {
  }

  public getComplaintsByPostId(): void {
    this.subscriptions.push(this.complaintService.getComplaintsByPostId(this.postId)
      .subscribe(complaints => {
      this.postComplaints = complaints;
    }))
  }

  public showComplaints(): void {
    this.visibility = !this.visibility;
    this.checkComplaints();
  }

  public checkComplaints() {
    if(this.visibility) {
      this.getComplaintsByPostId();
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
