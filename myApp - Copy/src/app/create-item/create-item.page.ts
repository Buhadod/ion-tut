import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.page.html',
  styleUrls: ['./create-item.page.scss'],
})
export class CreateItemPage implements OnInit {

  myform: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private http: HttpClient,public toastController: ToastController) { }

  ngOnInit() {
    this.myform = this.formBuilder.group({
      name: ['', [Validators.required ]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
  }

  submitForm() {
    this.isSubmitted = true;

    if (!this.myform.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {


      let body = this.myform.value;
      var headers = new HttpHeaders();
      headers.set('Content-Type', 'multipart/form-data');
      // headers.set('Authorization', 'Bearer ' + token);
      let requestOptions = ({ headers: headers });

      this.http.post("http://localhost/sites/lara-tut/blog/public/api/items",body,requestOptions)
      .subscribe(data => {
          console.log(data);
          this.presentSuccessToast();
          history.go(-1);
    
      }, error => {
        console.log(error);
          this.presentErrorToast();
      });

    }
  }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Your item have been created successfully.',
      duration: 2000,
      color : "success"
    });
    toast.present();
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Error : Failed to create an item',
      duration: 2000,
      color : "danger"
    });
    toast.present();
  }
}
