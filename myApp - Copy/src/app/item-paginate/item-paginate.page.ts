import { Component, OnInit,ViewChild  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';
@Component({
  selector: 'app-item-paginate',
  templateUrl: './item-paginate.page.html',
  styleUrls: ['./item-paginate.page.scss'],
})
export class ItemPaginatePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  public items:any;
  public nexturl:any;

  constructor( private http: HttpClient) { }

  ionViewWillEnter(){
   
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.getData();
  }

  getData(){
      var headers = new HttpHeaders();
      let requestOptions = ({ headers: headers });

      this.http.get("http://localhost/sites/lara-tut/blog/public/api/items/paginate",requestOptions)
      .subscribe(data => {
          this.items = data['items'].data;
          this.nexturl = data['items'].next_page_url;
          console.log(this.items, this.nexturl);
                  
      }, error => {
        console.log(error);
      });
  }

  getDataOnScroll(event) {
    setTimeout(() => {
      console.log('Done');
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      var headers = new HttpHeaders();
      let requestOptions = ({ headers: headers });

      this.http.get(this.nexturl,requestOptions)
      .subscribe(data => {
          this.items = this.items.concat(data['items'].data);
          this.nexturl = data['items'].next_page_url;

          
          if(this.nexturl == null)
            event.target.disabled = true;
                  
      }, error => {
        console.log(error);
        //event.target.disabled = true;
      });


    }, 500);
  }

 


}
