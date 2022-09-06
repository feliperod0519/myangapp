import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Testing App!';
  users: any;

  constructor(private http: HttpClient, private accountService: AccountService){
  
  }

  ngOnInit(){
    this.getUsers();
    this.setCurrentUser();
  }

  getUsers(){
    this.http.get('https://localhost:5001/api/users').subscribe({
    next: (r)=>{
                  this.users = r;
               },
    error: (e)=> {
                   console.log(e);
                 }
    });
  }

  setCurrentUser(){
    const user:User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
}

/*
import { of } from 'rxjs';

// recommended 
of([1,2,3]).subscribe((v) => console.info(v));
// also recommended
of([1,2,3]).subscribe({
    next: (v) => console.log(v),
    error: (e) => console.error(e),
    complete: () => console.info('complete') 
})*/
