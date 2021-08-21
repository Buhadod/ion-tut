import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {

  id:any;
  item:any;
  myform: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private http: HttpClient,public toastController: ToastController,private activatedRoute: ActivatedRoute) { }

  getData(){

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    var headers = new HttpHeaders();
    let requestOptions = ({ headers: headers });

    this.http.get("http://localhost/sites/lara-tut/blog/public/api/items/"+this.id,requestOptions)
    .subscribe(data => {
      
      console.log(data);
      this.item = data['item'];

      this.myform.controls.name.setValue(this.item.name);
      this.myform.controls.description.setValue(this.item.description);
      this.myform.controls.price.setValue(this.item.price);

        
                
    }, error => {
      console.log(error);
    });
}

  ngOnInit() {

    this.myform = this.formBuilder.group({
      name: ["", [Validators.required ]],
      description: ["", [Validators.required]],
      price: ["", [Validators.required]],
    })

    this.getData();
  }

  submitForm() {
    this.isSubmitted = true;

    if (!this.myform.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {


      let body = this.myform.value;
      console.log(body);
      body["_method"] = "PUT";
      console.log(body);
      var headers = new HttpHeaders();
      headers.set('Content-Type', 'multipart/form-data');
      // headers.set('Authorization', 'Bearer ' + token);
      let requestOptions = ({ headers: headers });

      this.http.post("http://localhost/sites/lara-tut/blog/public/api/items/"+this.id,body,requestOptions)
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
