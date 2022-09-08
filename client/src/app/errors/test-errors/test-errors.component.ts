import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

  baseUrl = "https://localhost:5001/api/";
  validationErrors:string[]=[];
  
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseUrl + "buggy/not-found").subscribe(
    {
      next:(r)=>{console.log(r);},
      error:(e)=>{console.log(e);}
    });
  }

  get400Error(){
    this.http.get(this.baseUrl + "buggy/bad-request").subscribe(
    {
      next:(r)=>{console.log(r);},
      error:(e)=>{console.log(e);}
    });
  }

  get500Error(){
    this.http.get(this.baseUrl + "buggy/server-error").subscribe(
    {
      next:(r)=>{console.log(r);},
      error:(e)=>{console.log(e);}
    });
  }

  get401Error(){
    this.http.get(this.baseUrl + "buggy/auth_test").subscribe(
    {
      next:(r)=>{console.log(r);},
      error:(e)=>{console.log(e);}
    });
  }

  getValidationError(){
    this.http.post(this.baseUrl + "account/register",{}).subscribe(
    {
      next:(r)=>{console.log(r);},
      error:(e)=>{
        console.log(e);
        this.validationErrors=e;
      }
    });
  }


}
