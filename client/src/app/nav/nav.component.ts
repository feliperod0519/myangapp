import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


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
  constructor(public accountService:AccountService, 
              private router:Router,
              private toastr:ToastrService) { }

  ngOnInit(): void {
    //this.getCurrentUser();
    //this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    //console.log(this.model);
    this.accountService.login(this.model).subscribe({ next: (r)=>{
                                                                    console.log(r);
                                                                    //this.loggedIn = true;
                                                                    this.router.navigateByUrl('/members');
                                                                  }
                                                    });
  }

  logout(){
    //this.loggedIn = false;
    this.accountService.logout();
    this.router.navigateByUrl('/');
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
