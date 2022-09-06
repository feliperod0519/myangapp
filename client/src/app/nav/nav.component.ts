import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any = {}
  //loggedIn:boolean;
  //currentUser$: Observable<User>;

  //constructor(private accountService:AccountService) { }
  constructor(public accountService:AccountService) { }

  ngOnInit(): void {
    //this.getCurrentUser();
    //this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    //console.log(this.model);
    this.accountService.login(this.model).subscribe({ next: (r)=>{
                                                                    console.log(r);
                                                                    //this.loggedIn = true;
                                                                  },
                                                      error:(e)=>{ console.log(e); }
                                                    });
  }

  logout(){
    //this.loggedIn = false;
    this.accountService.logout();
  }

  /*
  getCurrentUser(){
    this.accountService.currentUser$.subscribe({
      next:(user)=>{
        this.loggedIn = !!user;
       },
      error:(e)=>{console.log(e);}
    })
  }
  */
}
