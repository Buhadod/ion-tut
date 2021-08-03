# Setup and authentication

## Requirement
Please install the following software to start up:

- Node.js : https://nodejs.org/en/
- ionic : https://ionicframework.com/getting-started#install
- git : https://git-scm.com/downloads
- VScode : https://code.visualstudio.com/
- Google Chrome : Can't say where :)

## Install ionic

ionic is node.js package. you can install it via running the command:

    npm install -g @ionic/cli

Ref: https://ionicframework.com/getting-started#install

## create new application

You can create apps using this command with this syntax

    ionic start <app name>

    ionic start myFirstApp

Then, you can select what the langauge and template you want. It is better to start with templates. I prefer to use `sidemenu`. 
For lanugate, I will pick `Angular` since I'm very familair with it. For the capacitor, select `N` if you don't need it. Ionic account is no needed for now as well.

## Run the app

    ionic serve

Can run the app, it will run in your default browser but you access it from any other browser as well using the smae url. I would recommed for now to test it in Google Chrome becasue it has many useful feature.

Using serve you can make changes on the code and see them immediately. CSS may reqiure to stop serve using `Ctrl+z` and re-run serve again to see the changes.

# Create new page , service .. etc

    ionic generate 

Use this general command to create what ever you need. For now. We will create a simple form. For login for example. So choose 'page' from the option and give it a name 'login' for example.

# Page structure :

Each page has around 5 files.
- *****-routing.module.ts : for routing within the page (I prefer to don't modifed it).
- *****.module.ts : For importing modules
- *****.page.html : Our front end page in html format. 
- *****.page.scss : Scss file for custom css style for this page only
- *****.page.spec.ts : No clue, but keep it as it is.
- *****.page.ts : Our Scripting file to write code :)

# Routing

Routing is important to control which page start and what its link. The file `app-routing.module.ts` control the routing for the whole app. If you want your app to start with specfic page. The set path `''` to be for your page. 

```
 {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  }

```

## Simple form

First add `import { ReactiveFormsModule } from '@angular/forms';` and `ReactiveFormsModule` to ***.moduel.ts file.

The code should be like this:
```
..
.
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [LoginPage]
})

```

Then, add the form template to the html file
```
<ion-header>
  <ion-toolbar>
    <ion-title>Ionic Forms</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <form [formGroup]="myform" (ngSubmit)="submitForm()" novalidate>


    <ion-item lines="full">
      <ion-label position="floating">Email</ion-label>
      <ion-input formControlName="email" type="email"></ion-input>
    </ion-item>
    <span class="error ion-padding" *ngIf="isSubmitted && myform.controls.email.errors?.required">
      Email is required.
    </span>
    <span class="error ion-padding" *ngIf="isSubmitted && myform.controls.email.errors?.pattern">
      Please provide valid email id.
    </span>

    
    <ion-item lines="full">
      <ion-label position="floating">Password</ion-label>
      <ion-input formControlName="password" type="password"></ion-input>
    </ion-item>
    <span class="error ion-padding" *ngIf="isSubmitted && myform.controls.email.errors?.required">
      Password is required.
    </span>

    <ion-row>
      <ion-col>
        <ion-button type="submit" color="primary" expand="block">Submit</ion-button>
      </ion-col>
    </ion-row>
  </form>
</ion-content>
```

Finally, add the script to the.ts file 
```
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  myform: FormGroup;
  isSubmitted = false;

  constructor(public formBuilder: FormBuilder) { }


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
      console.log(this.myform.value)
    }
  }

}

```

For http, add in app.module.ts

```
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

..

..

  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule],

..
```

in page

```
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
  constructor(public formBuilder: FormBuilder,private http: HttpClient) {

fileChange(event) {
    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {
        let file: File = fileList[0];
        let formData:FormData = new FormData();

        this.uploadedfile = file;
        formData.append('uploadFile', file, file.name);
        let headers = new Headers();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        //https://stackoverflow.com/questions/40214772/file-upload-in-angular
        console.log(formData);
        console.log(file);
    }

      <ion-input formControlName="picture" type="file" (change)="fileChange($event)" accept=".png"></ion-input>


```