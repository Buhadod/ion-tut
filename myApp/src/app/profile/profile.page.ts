import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  myform: FormGroup;
  uploadedPicture:any;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder,private http: HttpClient) { }

  ngOnInit() {
    this.myform = this.formBuilder.group({
      bio: ['', [Validators.required]],
      picture: ['', [Validators.required]],
    })
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.myform.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {

      //print values of form
      console.log(this.myform.value);

      //assmble data 
      let body:FormData = new FormData();
      body.append('bio',this.myform.value.bio);
      body.append('picture', this.uploadedPicture, this.uploadedPicture.name);

      var headers = new HttpHeaders();
      headers.set('Content-Type', 'multipart/form-data');
      // headers.set('Authorization', 'Bearer ' + token);
      let requestOptions = ({ headers: headers });

      this.http.post("http://localhost/sites/lara-tut/blog/public/api/updateProfile",body,requestOptions)
      .subscribe(data => {
          console.log(data);
      }, error => {
        console.log(error);
      });

    }
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();
        this.uploadedPicture = file;
        
    }
  }


}
