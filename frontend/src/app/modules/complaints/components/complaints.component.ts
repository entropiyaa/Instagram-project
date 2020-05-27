import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ComplaintService} from "../../../services/complaint.service";
import {Complaint} from "../../../models/complaint";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../../services/post.service";

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.css']
})
export class ComplaintsComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  private postId: number;
  public postComplaints: Complaint[] = [];

  displayedColumns: string[] = ['position', 'cause', 'date', 'user', 'post'];

  constructor(private complaintService: ComplaintService,
              private route: ActivatedRoute,
              private router: Router,
              private postService: PostService) {}

  ngOnInit(): void {
    this.postId = this.route.snapshot.params.postId;
    this.checkIdValid();
  }

  private checkIdValid(): void {
    this.subscriptions.push(this.postService.getPost(this.postId)
      .subscribe(() => {
        this.getComplaintsByPostId();
    }, () => {
      this.router.navigate(['**']);
    }))
  }

  private getComplaintsByPostId(): void {
    this.subscriptions.push(this.complaintService.getComplaintsByPostId(this.postId)
      .subscribe(complaints => {
      this.postComplaints = complaints;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
