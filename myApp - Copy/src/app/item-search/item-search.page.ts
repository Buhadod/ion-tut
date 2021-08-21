import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.page.html',
  styleUrls: ['./item-search.page.scss'],
})
export class ItemSearchPage implements OnInit {

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

  search(event){
    const query = event.target.value.toLowerCase();
    console.log(query);

    var headers = new HttpHeaders();
    let requestOptions = ({ headers: headers });

    this.http.get("http://localhost/sites/lara-tut/blog/public/api/items/search/"+query,requestOptions)
    .subscribe(data => {
      this.items = data;
                
    }, error => {
      console.log(error);
    });

  }

  
}
