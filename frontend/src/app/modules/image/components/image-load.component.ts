import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImageLoadingService} from "../../../services/image-loading.service";
import {Subscription} from "rxjs";
import {Image} from "../../../models/image";

@Component({
  selector: 'app-image-load',
  templateUrl: './image-load.component.html',
  styleUrls: ['./image-load.component.css']
})
export class ImageLoadComponent implements OnInit, OnDestroy{

  constructor(private http: HttpClient, private imageService: ImageLoadingService) {}

  ngOnInit(): void {
  }

  private subscriptions: Subscription[] = [];
  public selectedFile;
  imgURL: any;
  receivedImageData: any;
  base64Data: any;
  convertedImage: any;
  public image: Image;

  public  onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    // Below part is used to display the selected image
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };
  }

  // This part is for uploading
  onUpload() {
    const uploadData = new FormData();
    uploadData.append('name', "picture");
    uploadData.append('type', "jpg");
    uploadData.append('image', this.selectedFile, this.selectedFile.name);

    this.subscriptions.push(this.imageService.saveImage(uploadData).subscribe(image => {
      console.log(image);
      this.receivedImageData = image;
      this.base64Data = this.receivedImageData.pic;
      this.convertedImage = 'data:image/jpeg;base64,' + this.base64Data; },
      err => console.log('Error Occured duringng saving: ' + err) ));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

}
