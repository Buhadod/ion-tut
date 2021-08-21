import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-item',
  templateUrl: './item.page.html',
  styleUrls: ['./item.page.scss'],
})
export class ItemPage implements OnInit {

  public item:any;

  constructor( private http: HttpClient, private activatedRoute: ActivatedRoute,public toastController: ToastController,public alertController: AlertController) { }

  ngOnInit() {

    //this.getData();
  }

  ionViewWillEnter(){
    this.getData();
  }

  getData(){

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      var headers = new HttpHeaders();
      let requestOptions = ({ headers: headers });

      this.http.get("http://localhost/sites/lara-tut/blog/public/api/items/"+id,requestOptions)
      .subscribe(data => {
        
          console.log(data);
          this.item = data['item'];
          
                  
      }, error => {
        console.log(error);
      });
  }

  deleteRequest(id){
    let body:any = {};
      body['id'] = id;
      body["_method"] = "DELETE";
      var headers = new HttpHeaders();
      headers.set('Content-Type', 'multipart/form-data');
      let requestOptions = ({ headers: headers });

      this.http.post("http://localhost/sites/lara-tut/blog/public/api/items/"+id,body,requestOptions)
      .subscribe(data => {
          console.log(data);
          this.presentSuccessToast();
          history.go(-1);
    
      }, error => {
        console.log(error);
          this.presentErrorToast();
      });

  }

  async deleteItem(id){
   
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete this item ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
            this.deleteRequest(id);
          }
        }
      ]
    });

    await alert.present();
      
    }
  

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Your item have been deleted successfully.',
      duration: 2000,
      color : "success"
    });
    toast.present();
  }

  async presentErrorToast() {
    const toast = await this.toastController.create({
      message: 'Error : Failed to delete an item',
      duration: 2000,
      color : "danger"
    });
    toast.present();
  }
}
