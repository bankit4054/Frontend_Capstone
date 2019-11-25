﻿
/**
* @ngdoc service
* @name rfx.rest
* @description
* # rest
* Service to talk with backend api.
*/

import { Component, OnInit,Input } from '@angular/core';
import { Router} from '@angular/router';
import { RestAPIService } from "../Service/restAPIService/rest-apiservice.service";
import { UtilityServiceService } from '../Service/utility-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    @Input() userDetails = {user:{email: '', password:''}}
    constructor(public restApi: RestAPIService, public utilityApi: UtilityServiceService,
         private router: Router,private formBuilder: FormBuilder) {}
    apiData=this.utilityApi.getApiResponse();
    LoginForm: FormGroup;
    submitted = false;

    ngOnInit() {
        this.apiData.isApiCalled=false;
        this.LoginForm = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', [Validators.required]],
            //email: ['', [Validators.required, Validators.email]],
        });
    }
    // convenience getter for easy access to form fields
    get f() { return this.LoginForm.controls; }

    loginUser() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.LoginForm.invalid) {
            return;
        }
      this.userDetails.user=this.LoginForm.value;
       // api call for login
        this.restApi.doLogin(this.userDetails).subscribe((data:any) => {
            console.log(data);
            this.restApi.setApiSuccessmessage("Login Successful")
            this.utilityApi.setToken(data.token);
            this.router.navigate(['/home'])
        },
        error => {
            this.restApi.setApiErrorResponse(error)
        });
      }
   
}
