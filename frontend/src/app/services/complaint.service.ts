import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Complaint} from "../models/complaint";

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  private complaintUrl = '/api/complaints';

  constructor(private http: HttpClient) {}

  public getComplaintById(complaintId: number): Observable<Complaint> {
    return this.http.get<Complaint>(this.complaintUrl + '?id=' + complaintId);
  }

  public getComplaints(): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.complaintUrl);
  }

  public getComplaintsByPostId(postId: number): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(this.complaintUrl + "?post=" + postId);
  }

  public saveComplaint(complaint: Complaint): Observable<Complaint> {
    return this.http.post<Complaint>(this.complaintUrl, complaint);
  }

  public deleteComplaint(complainId: number): Observable<{}>{
    return this.http.delete( this.complaintUrl+ '?id=' + complainId);
  }

}
