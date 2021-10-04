import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  useremail = '';

  constructor(private httpClient: HttpClient) {
  }


  signup(signindata: { firstname: string, lastname: string, email: string, number: number, password: string, confirmpassword: string }) {
    this.useremail = signindata.email;
    const httpHeader = new HttpHeaders();
    httpHeader.append('content-type', 'application/json');
    return this.httpClient.post('http://localhost:9090/signup', signindata, {headers: httpHeader})
  }

  User() {
    let uri = 'http://localhost:9090/userdetails?email=' + this.useremail;
    return this.httpClient.get(uri)
  }

}
