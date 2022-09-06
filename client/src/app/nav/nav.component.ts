import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model:any = {}
  loggedIn:boolean;

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
  }

  login(){
    //console.log(this.model);
    this.accountService.login(this.model).subscribe({ next: (r)=>{
                                                                    console.log(r);
                                                                    this.loggedIn = true;
                                                                  },
                                                      error:(e)=>{ console.log(e); }
                                                    });
  }

  logout(){
    this.loggedIn = false;
  }
}