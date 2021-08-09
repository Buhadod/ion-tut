import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myform: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder, private http: HttpClient ,private router: Router) { }


  ngOnInit() {
    this.myform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  submitForm() {
    this.isSubmitted = true;
    if (!this.myform.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.myform.value);

      let body = this.myform.value;
      var headers = new HttpHeaders();
      headers.set('Content-Type', 'multipart/form-data');
      // headers.set('Authorization', 'Bearer ' + token);
      let requestOptions = ({ headers: headers });

      this.http.post("http://localhost/sites/lara-tut/blog/public/api/login-console-api",body,requestOptions)
      .subscribe(data => {
          console.log(data);
          
          //save string
          localStorage.setItem('token',data['access_token']);
          //save object
          localStorage.setItem('user',JSON.stringify(data));

          //Get string
          var token = localStorage.getItem('token');

          var user = JSON.parse(localStorage.getItem('user'));

          console.log(token,user);
          //this.router.navigate(['/items'])
      }, error => {
        console.log(error);
      });

    }
  }

}
