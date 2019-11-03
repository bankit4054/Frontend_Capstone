import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { UtilityServiceService } from '../utility-service.service';


@Injectable({
  providedIn: 'root'
})
export class RestAPIService {

  // Define API
  apiURL = 'http://192.168.0.32:6036';


  constructor(private http: HttpClient,private utilityService: UtilityServiceService) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer' +" "+  this.utilityService.getToken()
    })
  }  

  // HttpClient API Post() method => Fetch User list
  doLogin(user){
    console.log("in service",user);   
    return this.http.post(this.apiURL + '/users/sign_in.json',user)
    .pipe(
      catchError(this.handleError)
    )
  }  

  // API to fetch Part Numer
  getPartList(){
    return this.http.get(this.apiURL + '/parts.json',this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }  

// API to fetch Reason
getReasonList(){
  return this.http.get(this.apiURL + '/tbl_htpc_reasons.json',this.httpOptions)
  .pipe(
    catchError(this.handleError)
  )
}


  handleError(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }






}
