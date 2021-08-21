import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {


  public items:any;

  constructor( private http: HttpClient) { }

  ionViewWillEnter(){
    this.getData();
  }
  ngOnInit() {
    //this.getData();
  }

  getData(){
      var headers = new HttpHeaders();
      let requestOptions = ({ headers: headers });

      this.http.get("http://localhost/sites/lara-tut/blog/public/api/items",requestOptions)
      .subscribe(data => {
        this.items = data['items'];
          console.log(this.items);
          
                  
      }, error => {
        console.log(error);
      });
  }

  
}
